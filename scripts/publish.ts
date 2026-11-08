#!/usr/bin/env bun
/**
 * Publish immutable pack releases through the Platform registry API.
 *
 *   bun scripts/publish.ts --dry-run              # what would be published (changed packs)
 *   bun scripts/publish.ts --pack inject/backend/nestjs
 *   bun scripts/publish.ts --all --force            # submit all selected releases again
 *   bun scripts/publish.ts --all [--skip-invalid]   # publish what is ready, list the rest
 *
 * Set PLATFORM_API_URL and REGISTRY_PUBLISH_TOKEN for Platform publication. Use --dir <path>
 * to exercise the legacy local-storage publisher. Bundles are built from a commit, so commit first.
 */
import {
  DirectoryStorage,
  dirty,
  changedIds,
  bundle,
  describe,
  publish,
  readIndex,
  type Storage,
} from "./lib/registry.ts";
import { packIds } from "./lib/repository.ts";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const value = (name: string) => {
  const at = args.indexOf(name);
  return at === -1 ? undefined : args[at + 1];
};

const dryRun = flag("--dry-run");
const dir = value("--dir");
const apiUrl = process.env.PLATFORM_API_URL;
const apiToken = process.env.REGISTRY_PUBLISH_TOKEN;

if (!dir && !apiUrl) {
  throw new Error("PLATFORM_API_URL is required for publishing; use --dir only for local publisher tests");
}

if (!dir && apiUrl) {
  if (!apiToken) throw new Error("REGISTRY_PUBLISH_TOKEN is required with PLATFORM_API_URL");
  const base = apiUrl.replace(/\/$/, "");
  const headers = { Accept: "application/json", "X-Registry-Publish-Token": apiToken };
  const response = await fetch(`${base}/v1/registry/packs?status=all`, { headers });
  if (!response.ok) throw new Error(`Platform registry answered ${response.status}: ${await response.text()}`);
  const body = await response.json() as {
    packs: readonly { id: string; commit: string; version: string }[];
  };
  const published = new Map(
    body.packs.map((pack) => [pack.id, pack]),
  );
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
          const latest = published.get(packageId(id));
          try {
            const current = describe(id);
            return latest?.commit !== current.commit || latest?.version !== current.version;
          } catch {
            return true;
          }
        });
  if (ids.length === 0) {
    console.log("Nothing to publish: every pack is already published at its current commit.");
    process.exit(0);
  }
  const ready: { id: string; descriptor: ReturnType<typeof describe> }[] = [];
  const invalid: string[] = [];
  for (const id of ids) {
    try {
      if (dirty(id)) throw new Error(`${id} has uncommitted changes; commit the release before publishing`);
      const descriptor = describe(id);
      const latest = published.get(packageId(id));
      if (!flag("--force") && latest?.commit === descriptor.commit && latest.version === descriptor.version) {
        console.log(`unchanged @dryv/${packageName(id)}@${descriptor.version} (${id})`);
        continue;
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
    const result = await fetch(`${base}/v1/registry/publish`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        namespace: "@dryv",
        name,
        visibility: "public",
        descriptor,
        archiveBase64: archive.toString("base64"),
      }),
    });
    if (result.status === 409) {
      throw new Error(`@dryv/${name}@${descriptor.version} already exists; bump info.version before publishing changed pack content`);
    }
    if (!result.ok) throw new Error(`Platform registry rejected ${id}: ${result.status} ${await result.text()}`);
    console.log(`published @dryv/${name}@${descriptor.version} (${id})`);
  }
  for (const problem of invalid) console.error(`not publishable: ${problem}`);
  process.exit(0);
}

const storage: Storage = new DirectoryStorage(dir!);

const all = packIds();
const requested = value("--pack");
if (requested && !all.includes(requested)) {
  console.error(`unknown pack: ${requested}`);
  process.exit(2);
}

const ids = requested ? [requested] : flag("--all") ? all : changedIds(all, await readIndex(storage));
if (ids.length === 0) {
  console.log("Nothing to publish: every pack is already published at its latest commit.");
  process.exit(0);
}

const report = await publish(storage, { ids, dryRun, allowDirty: flag("--allow-dirty"),
  skipInvalid: flag("--skip-invalid"),
  force: flag("--force"),
});
const verb = dryRun ? "would publish" : "published";
for (const id of report.published) console.log(`${verb} ${id}`);
for (const id of report.skipped) console.log(`unchanged ${id}`);
for (const problem of report.invalid) console.error(`not publishable: ${problem}`);

function packageName(id: string): string {
  if (id === "unit/backend/nestjs") return "nestjs-app";
  const name = id.split("/").at(-1);
  if (!name) throw new Error(`cannot derive package name from ${id}`);
  return name;
}

function packageId(id: string): string {
  return `@dryv/${packageName(id)}`;
}
