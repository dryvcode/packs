/**
 * Pack registry publishing: typed descriptors, bundles and the index.
 *
 * Git is the source of truth for versions. The registry keeps only the latest published
 * state of each pack plus the commit it came from. Nothing here deletes anything.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { entry, type CatalogEntry } from "../catalog.ts";
import { PACKS, REPO, REPOSITORY_URL } from "./repository.ts";

export interface PackFile {
  readonly path: string;
  readonly size: number;
  /** Stored for the file viewer. Large or binary files are listed but not stored. */
  readonly viewable: boolean;
}

export interface PackDescriptor extends CatalogEntry {
  /** Every file in the pack at this commit, relative to the pack folder. */
  readonly files: readonly PackFile[];
  readonly description: string | null;
  readonly readme: string;
  readonly changelog: string | null;
  /** The last commit that changed this pack. Repeatable builds pin this. */
  readonly commit: string;
  readonly bundle: { readonly key: string; readonly sha256: string; readonly bytes: number };
  readonly publishedAt: string;
}

export interface RegistryIndex {
  readonly schema: "dryv.packs.index/v1alpha1";
  readonly updatedAt: string;
  readonly packs: readonly PackDescriptor[];
}

export interface Storage {
  get(key: string): Promise<Uint8Array | null>;
  put(key: string, body: Uint8Array | string, contentType: string): Promise<void>;
  /** Keys under a prefix (relative to the storage root). */
  list(prefix: string): Promise<string[]>;
  delete(key: string): Promise<void>;
}

export const INDEX_KEY = "packs/index.json";
// One bundle per pack, overwritten on each publish: Git holds the history, the bucket holds the latest.
export const bundleKey = (id: string, _commit?: string) => `packs/${id}/bundle.tar.gz`;
export const descriptorKey = (id: string) => `packs/${id}/latest.json`;
export const fileKey = (id: string, path: string) => `packs/${id}/files/${path}`;

const MAX_VIEWABLE_BYTES = 256 * 1024;
const MAX_FILES = 600;
const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|tgz|woff2?|ttf|otf|mp4|mov|jar|class|so|dylib|exe)$/i;

/** Files of a pack at a commit, from Git, so the listing is exactly what was committed. */
export function packFiles(id: string, commit: string): PackFile[] {
  const out = git(["ls-tree", "-r", "-l", commit, "--", `packs/${id}`]).toString();
  const prefix = `packs/${id}/`;
  const files: PackFile[] = [];
  for (const line of out.split("\n")) {
    const match = line.match(/^\d+ blob [0-9a-f]+\s+(\d+)\t(.+)$/);
    if (!match) continue;
    const path = match[2].slice(prefix.length);
    const size = Number(match[1]);
    files.push({ path, size, viewable: size <= MAX_VIEWABLE_BYTES && !BINARY.test(path) });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path)).slice(0, MAX_FILES);
}

export function fileContent(id: string, commit: string, path: string): Buffer {
  return git(["show", `${commit}:packs/${id}/${path}`]);
}

const TYPES: Record<string, string> = {
  json: "application/json", md: "text/markdown; charset=utf-8", yaml: "text/yaml; charset=utf-8", yml: "text/yaml; charset=utf-8",
  svg: "image/svg+xml", html: "text/html; charset=utf-8", css: "text/css; charset=utf-8", js: "text/javascript; charset=utf-8",
};
export const contentTypeFor = (path: string) => TYPES[path.split(".").at(-1)?.toLowerCase() ?? ""] ?? "text/plain; charset=utf-8";

function git(args: string[]): Buffer {
  const result = Bun.spawnSync(["git", ...args], { cwd: REPO });
  if (result.exitCode !== 0) throw new Error(`git ${args.join(" ")}: ${result.stderr.toString()}`);
  return Buffer.from(result.stdout);
}

export function lastCommit(id: string): string {
  const commit = git(["log", "-1", "--format=%H", "--", `packs/${id}`]).toString().trim();
  if (!commit) throw new Error(`${id}: no commit touches this pack`);
  return commit;
}

export function dirty(id: string): boolean {
  return git(["status", "--porcelain", "--", `packs/${id}`]).toString().trim() !== "";
}

export function bundle(id: string, commit: string): Buffer {
  const name = id.split("/").at(-1) ?? id;
  return git(["archive", "--format=tar.gz", `--prefix=${name}/`, commit, `packs/${id}`]);
}

function optionalText(path: string): string | null {
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

export function describe(id: string, now = new Date()): PackDescriptor {
  const { entry: catalog, problems } = entry(id);
  if (catalog === null || problems.length > 0) {
    throw new Error(`${id} is not publishable:\n${problems.map((p) => `  - ${p}`).join("\n")}`);
  }
  const dir = join(PACKS, id);
  const readme = optionalText(join(dir, "README.md"));
  if (readme === null || readme.trim() === "") throw new Error(`${id}: README.md is required`);
  const document = Bun.YAML.parse(readFileSync(join(dir, "dryv.pack.yaml"), "utf8")) as {
    info: { description?: string };
  };
  const commit = lastCommit(id);
  const archive = bundle(id, commit);
  return {
    ...catalog,
    files: packFiles(id, commit),
    source: { repository: REPOSITORY_URL, ref: commit, root: "packs" },
    description: document.info.description ?? null,
    readme,
    changelog: optionalText(join(dir, "CHANGELOG.md")),
    commit,
    bundle: {
      key: bundleKey(id, commit),
      sha256: createHash("sha256").update(archive).digest("hex"),
      bytes: archive.byteLength,
    },
    publishedAt: now.toISOString(),
  };
}

export async function readIndex(storage: Storage): Promise<RegistryIndex> {
  const raw = await storage.get(INDEX_KEY);
  if (raw === null) {
    return { schema: "dryv.packs.index/v1alpha1", updatedAt: new Date(0).toISOString(), packs: [] };
  }
  return JSON.parse(new TextDecoder().decode(raw)) as RegistryIndex;
}

/** Ids whose latest commit differs from what the registry has published. */
export function changedIds(ids: readonly string[], index: RegistryIndex): string[] {
  const published = new Map(index.packs.map((p) => [p.id, p.commit]));
  return ids.filter((id) => published.get(id) !== lastCommit(id));
}

export interface PublishOptions {
  readonly ids: readonly string[];
  readonly dryRun: boolean;
  readonly allowDirty: boolean;
  /** Publish the packs that are ready and report the rest, instead of refusing everything. */
  readonly skipInvalid?: boolean;
  /** Publish even when the commit is unchanged, for example to refresh stored files. */
  readonly force?: boolean;
  /** Called after a pack is uploaded, for example to record it in the Dryv API. */
  readonly onPublished?: (descriptor: PackDescriptor) => Promise<void>;
}

export interface PublishReport {
  readonly published: readonly string[];
  readonly skipped: readonly string[];
  readonly invalid: readonly string[];
}

export async function publish(storage: Storage, options: PublishOptions): Promise<PublishReport> {
  const index = await readIndex(storage);
  const byId = new Map(index.packs.map((p) => [p.id, p]));
  const published: string[] = [];
  const skipped: string[] = [];
  const descriptors = new Map<string, PackDescriptor>();
  const problems: string[] = [];
  for (const id of options.ids) {
    try {
      if (dirty(id) && !options.allowDirty) {
        throw new Error(`${id} has uncommitted changes; commit first (bundles are built from a commit)`);
      }
      descriptors.set(id, describe(id));
    } catch (error) {
      problems.push(error instanceof Error ? error.message : String(error));
    }
  }
  if (problems.length > 0 && !options.skipInvalid) {
    throw new Error(`Nothing was published. Fix these first:\n${problems.join("\n")}`);
  }
  for (const id of options.ids) {
    const descriptor = descriptors.get(id);
    if (descriptor === undefined) continue; // invalid and skipped
    if (!options.force && byId.get(id)?.commit === descriptor.commit) {
      skipped.push(id);
      continue;
    }
    if (!options.dryRun) {
      await storage.put(descriptor.bundle.key, bundle(id, descriptor.commit), "application/gzip");
      await storage.put(descriptorKey(id), JSON.stringify(descriptor, null, 2), "application/json");
      // The file viewer reads these. Mirror: overwrite what exists, delete what the commit no longer has.
      const wanted = new Set(descriptor.files.filter((f) => f.viewable).map((f) => fileKey(id, f.path)));
      for (const file of descriptor.files) {
        if (file.viewable) await storage.put(fileKey(id, file.path), fileContent(id, descriptor.commit, file.path), contentTypeFor(file.path));
      }
      for (const key of await storage.list(`packs/${id}/files/`)) {
        if (!wanted.has(key)) await storage.delete(key);
      }
      await options.onPublished?.(descriptor);
    }
    byId.set(id, descriptor);
    published.push(id);
  }
  if (!options.dryRun && published.length > 0) {
    const next: RegistryIndex = {
      schema: "dryv.packs.index/v1alpha1",
      updatedAt: new Date().toISOString(),
      // Retired or renamed packs are never dropped from the index.
      packs: [...byId.values()].sort((a, b) => a.id.localeCompare(b.id)),
    };
    await storage.put(INDEX_KEY, JSON.stringify(next, null, 2), "application/json");
  }
  return { published, skipped, invalid: problems };
}

export class DirectoryStorage implements Storage {
  constructor(private readonly root: string) {}
  async get(key: string): Promise<Uint8Array | null> {
    const path = join(this.root, key);
    return existsSync(path) ? new Uint8Array(readFileSync(path)) : null;
  }
  async put(key: string, body: Uint8Array | string): Promise<void> {
    const path = join(this.root, key);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, body);
  }
  async list(prefix: string): Promise<string[]> {
    const root = join(this.root, prefix);
    if (!existsSync(root)) return [];
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
    return walk(root).map((f) => f.slice(this.root.length + 1));
  }
  async delete(key: string): Promise<void> {
    rmSync(join(this.root, key), { force: true });
  }
}

export function s3Storage(env: Record<string, string | undefined>): Storage {
  const endpoint = env.S3_ENDPOINT;
  const bucket = env.S3_BUCKET ?? "dryv";
  // One bucket; the public/ folder is what the bucket policy exposes to anonymous readers.
  const prefix = env.S3_PREFIX ?? "public/";
  if (!endpoint) throw new Error("S3_ENDPOINT is required (for example https://assets.alidantech.org)");
  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required");
  }
  const client = new Bun.S3Client({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_DEFAULT_REGION ?? "us-east-1",
    endpoint,
    bucket,
  });
  return {
    async get(key) {
      const file = client.file(prefix + key);
      return (await file.exists()) ? new Uint8Array(await file.arrayBuffer()) : null;
    },
    async put(key, body, contentType) {
      await client.write(prefix + key, body, { type: contentType });
    },
    async list(under) {
      const keys: string[] = [];
      let token: string | undefined;
      do {
        const page = await client.list({ prefix: prefix + under, maxKeys: 1000, ...(token ? { continuationToken: token } : {}) });
        for (const object of page.contents ?? []) keys.push(object.key.slice(prefix.length));
        token = page.isTruncated ? page.nextContinuationToken : undefined;
      } while (token);
      return keys;
    },
    async delete(key) {
      await client.delete(prefix + key);
    },
  };
}

/** Record a published pack in the Dryv API registry (needs a Dryv API key). */
export function apiNotifier(
  env: Record<string, string | undefined>,
): ((descriptor: PackDescriptor) => Promise<void>) | undefined {
  const base = env.DRYV_API_URL;
  const key = env.DRYV_API_KEY;
  if (!base) return undefined;
  if (!key) throw new Error("DRYV_API_KEY is required when DRYV_API_URL is set");
  return async (descriptor) => {
    const response = await fetch(`${base.replace(/\/$/, "")}/v1/registry/publish`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(descriptor),
    });
    if (!response.ok) {
      throw new Error(`registry rejected ${descriptor.id}: ${response.status} ${await response.text()}`);
    }
  };
}
