#!/usr/bin/env bun
/** Publish immutable pack releases through the Platform registry API. */
import {
  bundle,
  describe,
  dirty,
  packageId,
  packageName,
} from "./lib/registry.ts";
import { packIds } from "./lib/repository.ts";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const value = (name: string) => {
  const at = args.indexOf(name);
  return at < 0 ? undefined : args[at + 1];
};

const apiUrl = process.env.PLATFORM_API_URL ?? process.env.DRYV_PLATFORM_URL;
const token = process.env.REGISTRY_PUBLISH_TOKEN;
const dryRun = flag("--dry-run");
if (!apiUrl) {
  throw new Error("PLATFORM_API_URL or DRYV_PLATFORM_URL is required to publish packs");
}
if (!dryRun && !token) {
  throw new Error("REGISTRY_PUBLISH_TOKEN is required to publish packs");
}

const base = apiUrl.replace(/\/$/, "");
const listResponse = await fetch(`${base}/v1/registry/packs?status=all`, {
  headers: { Accept: "application/json" },
});
if (!listResponse.ok) {
  throw new Error(`Platform registry answered ${listResponse.status}: ${await listResponse.text()}`);
}
const body = (await listResponse.json()) as {
  packs: readonly { id: string; commit: string; version: string }[];
};
const latestById = new Map(body.packs.map((pack) => [pack.id, pack]));
const all = packIds();
const requested = value("--pack");
if (requested && !all.includes(requested)) {
  console.error(`unknown pack: ${requested}`);
  process.exit(2);
}

const ids = requested
  ? [requested]
  : flag("--all")
    ? all
    : all.filter((id) => {
        const published = latestById.get(packageId(id));
        try {
          const current = describe(id);
          return published?.commit !== current.commit || published?.version !== current.version;
        } catch {
          return true;
        }
      });

if (ids.length === 0) {
  console.log("Nothing to publish: every pack is already published at its current version and commit.");
  process.exit(0);
}

const ready: { id: string; descriptor: ReturnType<typeof describe> }[] = [];
const invalid: string[] = [];
for (const id of ids) {
  try {
    if (dirty(id)) throw new Error(`${id} has uncommitted changes; commit the release before publishing`);
    const descriptor = describe(id);
    const latest = latestById.get(packageId(id));
    if (!flag("--force") && latest?.commit === descriptor.commit && latest.version === descriptor.version) {
      console.log(`unchanged ${packageId(id)}@${descriptor.version} (${id})`);
      continue;
    }
    const exactPublishedRelease = latest?.commit === descriptor.commit && latest.version === descriptor.version;
    if (latest && !exactPublishedRelease && compareVersions(descriptor.version, latest.version) <= 0) {
      throw new Error(
        `${packageId(id)}@${descriptor.version} is not newer than the published ${latest.version}; increment info.version for every release`,
      );
    }
    ready.push({ id, descriptor });
  } catch (error) {
    invalid.push(error instanceof Error ? error.message : String(error));
  }
}

if (invalid.length > 0 && !flag("--skip-invalid")) {
  throw new Error(`Nothing was published. Fix these first:\n${invalid.join("\n")}`);
}

for (const { id, descriptor } of ready) {
  const name = packageName(id);
  if (dryRun) {
    console.log(`would publish @dryv/${name}@${descriptor.version} (${id})`);
    continue;
  }
  const archive = bundle(id, descriptor.commit);
  const response = await fetch(`${base}/v1/registry/publish`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Registry-Publish-Token": token!,
    },
    body: JSON.stringify({
      namespace: "@dryv",
      name,
      visibility: "public",
      descriptor,
      archiveBase64: archive.toString("base64"),
    }),
  });
  if (response.status === 409) {
    throw new Error(`@dryv/${name}@${descriptor.version} already exists; bump info.version before publishing changed pack content`);
  }
  if (!response.ok) {
    throw new Error(`Platform registry rejected ${id}: ${response.status} ${await response.text()}`);
  }
  console.log(`published @dryv/${name}@${descriptor.version} (${id})`);
}

for (const problem of invalid) console.error(`not publishable: ${problem}`);

function compareVersions(left: string, right: string): number {
  const parse = (version: string) => {
    const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(version);
    if (!match) throw new Error(`Invalid semantic version: ${version}`);
    return {
      core: match.slice(1, 4).map(BigInt),
      prerelease: match[4]?.split(".") ?? [],
    };
  };
  const a = parse(left);
  const b = parse(right);
  for (let index = 0; index < 3; index += 1) {
    const leftPart = a.core[index]!;
    const rightPart = b.core[index]!;
    if (leftPart !== rightPart) return leftPart < rightPart ? -1 : 1;
  }
  if (a.prerelease.length === 0) return b.prerelease.length === 0 ? 0 : 1;
  if (b.prerelease.length === 0) return -1;
  const count = Math.max(a.prerelease.length, b.prerelease.length);
  for (let index = 0; index < count; index += 1) {
    const av = a.prerelease[index];
    const bv = b.prerelease[index];
    if (av === undefined) return -1;
    if (bv === undefined) return 1;
    if (av === bv) continue;
    const an = /^(0|[1-9]\d*)$/.test(av) ? BigInt(av) : null;
    const bn = /^(0|[1-9]\d*)$/.test(bv) ? BigInt(bv) : null;
    if (an !== null && bn !== null) return an < bn ? -1 : 1;
    if (an !== null) return -1;
    if (bn !== null) return 1;
    return av < bv ? -1 : 1;
  }
  return 0;
}
