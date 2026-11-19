/** Pack descriptors and immutable archives submitted to the Platform registry. */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { entry, type CatalogEntry } from "../catalog.ts";
import { PACKS, REPO, REPOSITORY_URL } from "./repository.ts";

export interface PackFile {
  readonly path: string;
  readonly size: number;
  /** Stored for the file viewer. Large or binary files are listed but not stored. */
  readonly viewable: boolean;
}

export interface PackDescriptor extends CatalogEntry {
  readonly files: readonly PackFile[];
  readonly description: string | null;
  readonly readme: string;
  readonly changelog: string | null;
  readonly commit: string;
  readonly bundle: { readonly key: string; readonly sha256: string; readonly bytes: number };
  readonly publishedAt: string;
}

const MAX_VIEWABLE_BYTES = 256 * 1024;
const MAX_FILES = 600;
const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|zip|gz|tgz|woff2?|ttf|otf|mp4|mov|jar|class|so|dylib|exe)$/i;

export function packageName(id: string): string {
  if (id === "unit/backend/nestjs") return "nestjs-app";
  const name = id.split("/").at(-1);
  if (!name) throw new Error(`cannot derive package name from ${id}`);
  return name;
}

export function packageId(id: string): string {
  return `@dryv/${packageName(id)}`;
}

function git(args: string[]): Buffer {
  const result = Bun.spawnSync(["git", ...args], { cwd: REPO });
  if (result.exitCode !== 0) {
    throw new Error(`git ${args.join(" ")}: ${result.stderr.toString()}`);
  }
  return Buffer.from(result.stdout);
}

export function lastCommit(id: string): string {
  const commit = git(["log", "-1", "--format=%H", "--", `packs/${id}`])
    .toString()
    .trim();
  if (!commit) throw new Error(`${id}: no commit touches this pack`);
  return commit;
}

export function dirty(id: string): boolean {
  return git(["status", "--porcelain", "--", `packs/${id}`])
    .toString()
    .trim() !== "";
}

export function bundle(id: string, commit: string): Buffer {
  return git([
    "archive",
    "--format=tar.gz",
    `--prefix=${packageName(id)}/`,
    commit,
    `packs/${id}`,
  ]);
}

function packFiles(id: string, commit: string): PackFile[] {
  const output = git(["ls-tree", "-r", "-l", commit, "--", `packs/${id}`]).toString();
  const prefix = `packs/${id}/`;
  const files: PackFile[] = [];
  for (const line of output.split("\n")) {
    const match = line.match(/^\d+ blob [0-9a-f]+\s+(\d+)\t(.+)$/);
    if (!match) continue;
    const path = match[2].slice(prefix.length);
    const size = Number(match[1]);
    files.push({ path, size, viewable: size <= MAX_VIEWABLE_BYTES && !BINARY.test(path) });
  }
  return files.sort((left, right) => left.path.localeCompare(right.path)).slice(0, MAX_FILES);
}

function optionalText(path: string): string | null {
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

export function describe(id: string, now = new Date()): PackDescriptor {
  const { entry: catalog, problems } = entry(id);
  if (catalog === null || problems.length > 0) {
    throw new Error(
      `${id} is not publishable:\n${problems.map((problem) => `  - ${problem}`).join("\n")}`,
    );
  }
  const directory = join(PACKS, id);
  const readme = optionalText(join(directory, "README.md"));
  if (readme === null || readme.trim() === "") {
    throw new Error(`${id}: README.md is required`);
  }
  const document = Bun.YAML.parse(readFileSync(join(directory, "dryv.pack.yaml"), "utf8")) as {
    info: { description?: string };
  };
  const commit = lastCommit(id);
  const archive = bundle(id, commit);
  const name = packageName(id);
  return {
    ...catalog,
    files: packFiles(id, commit),
    source: { repository: REPOSITORY_URL, ref: commit, root: "packs" },
    description: document.info.description ?? null,
    readme,
    changelog: optionalText(join(directory, "CHANGELOG.md")),
    commit,
    bundle: {
      key: `packs/@dryv/${name}/${catalog.version}/bundle.tar.gz`,
      sha256: createHash("sha256").update(archive).digest("hex"),
      bytes: archive.byteLength,
    },
    publishedAt: now.toISOString(),
  };
}
