#!/usr/bin/env bun
/**
 * Build the packs catalogue: discovery metadata for every pack, read from each
 * dryv.pack.yaml. Discovery only; Dryv never reads the catalogue to plan or generate.
 *
 *   bun scripts/catalog.ts [out.json]       # default: catalog.json
 *   bun scripts/catalog.ts --check          # fail when a pack's metadata is missing or inconsistent
 */
import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const REPO = resolve(import.meta.dir, "..");
const PACKS = join(REPO, "packs");
const REPOSITORY = "https://github.com/dryvcode/packs";

type PackDocument = {
  key: string;
  layout?: "inject" | "package" | "project";
  info: { title: string; version: string; description?: string };
  catalog?: { purpose: string; summary?: string; languages?: string[]; frameworks?: string[]; tags?: string[] };
  provides?: Record<string, unknown>;
  needs?: Record<string, unknown>;
};

export type CatalogEntry = {
  id: string;
  key: string;
  title: string;
  version: string;
  summary: string | null;
  purpose: string;
  layout: "inject" | "package" | "project";
  languages: string[];
  frameworks: string[];
  tags: string[];
  provides: string[];
  needs: string[];
  source: { repository: string; ref: string; root: string };
  path: string;
};

function packs(): string[] {
  const found: string[] = [];
  for (const layout of readdirSync(PACKS, { withFileTypes: true })) {
    if (!layout.isDirectory()) continue;
    for (const purpose of readdirSync(join(PACKS, layout.name), { withFileTypes: true })) {
      if (!purpose.isDirectory()) continue;
      for (const pack of readdirSync(join(PACKS, layout.name, purpose.name), { withFileTypes: true })) {
        if (pack.isDirectory() && existsSync(join(PACKS, layout.name, purpose.name, pack.name, "dryv.pack.yaml"))) {
          found.push(`${layout.name}/${purpose.name}/${pack.name}`);
        }
      }
    }
  }
  return found.sort();
}

export function entry(id: string): { entry: CatalogEntry | null; problems: string[] } {
  const [layout, purpose, name] = id.split("/") as ["inject" | "package" | "project", string, string];
  const document = Bun.YAML.parse(readFileSync(join(PACKS, id, "dryv.pack.yaml"), "utf8")) as PackDocument;
  const problems: string[] = [];
  const catalog = document.catalog;
  if (catalog === undefined) problems.push(`${id}: no catalog block`);
  else if (catalog.purpose !== purpose) problems.push(`${id}: catalog.purpose is ${catalog.purpose}, folder is ${purpose}`);
  if (document.key !== `${purpose}.${name}`) problems.push(`${id}: key is ${document.key}, expected ${purpose}.${name}`);
  if ((document.layout ?? "inject") !== layout) problems.push(`${id}: layout is ${document.layout ?? "inject"}, folder is ${layout}`);
  if (catalog === undefined) return { entry: null, problems };
  const version = document.info.version;
  return {
    problems,
    entry: {
      id,
      key: document.key,
      title: document.info.title,
      version,
      summary: catalog.summary ?? null,
      purpose: catalog.purpose,
      layout: document.layout ?? "inject",
      languages: catalog.languages ?? [],
      frameworks: catalog.frameworks ?? [],
      tags: catalog.tags ?? [],
      provides: Object.keys(document.provides ?? {}).sort(),
      needs: Object.keys(document.needs ?? {}).sort(),
      source: { repository: REPOSITORY, ref: `${id}/v${version}`, root: "packs" },
      path: id,
    },
  };
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const results = packs().map(entry);
  const problems = results.flatMap((result) => result.problems);
  for (const problem of problems) console.error(`✖ ${problem}`);
  if (args.includes("--check")) {
    if (problems.length === 0) console.log(`✓ ${results.length} pack(s) have consistent catalogue metadata.`);
    process.exit(problems.length === 0 ? 0 : 1);
  }
  if (problems.length > 0) process.exit(1);
  const out = args.find((arg) => !arg.startsWith("--")) ?? "catalog.json";
  const catalogue = {
    repository: REPOSITORY,
    packs: results.map((result) => result.entry).filter((value): value is CatalogEntry => value !== null),
  };
  writeFileSync(out, `${JSON.stringify(catalogue, null, 2)}\n`);
  console.log(`✓ wrote ${catalogue.packs.length} pack(s) to ${out}`);
}
