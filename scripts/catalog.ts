#!/usr/bin/env bun
/**
 * Build the packs catalogue from dryv.pack.yaml metadata.
 *
 * Manifests are the only catalogue source of truth. The generated catalogue is a
 * discovery projection and is never semantic/runtime authority.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  PACKS,
  REPOSITORY_URL,
  packIds,
  parsePackId,
  releaseRef,
  type PackLayout,
} from "./lib/repository.ts";

type CatalogMetadata = {
  purpose: string;
  summary?: string;
  languages?: string[];
  frameworks?: string[];
  tags?: string[];
};

type PackDocument = {
  key: string;
  layout?: PackLayout;
  info: { title: string; version: string; description?: string };
  catalog?: CatalogMetadata;
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
  layout: PackLayout;
  languages: string[];
  frameworks: string[];
  tags: string[];
  provides: string[];
  needs: string[];
  source: { repository: string; ref: string; root: string };
  path: string;
};

function normalized(values: string[] | undefined, label: string, problems: string[]): string[] {
  const items = values ?? [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item.trim()) problems.push(`${label}: entries must be non-empty`);
    if (seen.has(item)) problems.push(`${label}: duplicate entry ${item}`);
    seen.add(item);
  }

  return [...items].sort();
}

export function entry(id: string): { entry: CatalogEntry | null; problems: string[] } {
  const { layout, purpose, name } = parsePackId(id);
  const document = Bun.YAML.parse(
    readFileSync(join(PACKS, id, "dryv.pack.yaml"), "utf8"),
  ) as PackDocument;
  const problems: string[] = [];
  const catalog = document.catalog;
  const effectiveLayout = document.layout ?? "inject";

  if (catalog === undefined) {
    problems.push(`${id}: no catalog block`);
  } else {
    if (catalog.purpose !== purpose) {
      problems.push(`${id}: catalog.purpose is ${catalog.purpose}, folder is ${purpose}`);
    }
    if (!catalog.summary?.trim()) problems.push(`${id}: catalog.summary must be non-empty`);
    if ((catalog.languages ?? []).length === 0) {
      problems.push(`${id}: catalog.languages must not be empty`);
    }
  }

  if (document.key !== `${layout}.${purpose}.${name}`) {
    problems.push(`${id}: key is ${document.key}, expected ${layout}.${purpose}.${name}`);
  }
  if (effectiveLayout !== layout) {
    problems.push(`${id}: layout is ${effectiveLayout}, folder is ${layout}`);
  }
  if (!document.info.title?.trim()) problems.push(`${id}: info.title must be non-empty`);
  if (!document.info.version?.trim()) problems.push(`${id}: info.version must be non-empty`);

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
      layout: effectiveLayout,
      languages: normalized(catalog.languages, `${id}: catalog.languages`, problems),
      frameworks: normalized(catalog.frameworks, `${id}: catalog.frameworks`, problems),
      tags: normalized(catalog.tags, `${id}: catalog.tags`, problems),
      provides: Object.keys(document.provides ?? {}).sort(),
      needs: Object.keys(document.needs ?? {}).sort(),
      source: { repository: REPOSITORY_URL, ref: releaseRef(id, version), root: "packs" },
      path: id,
    },
  };
}

function uniqueness(entries: CatalogEntry[]): string[] {
  const problems: string[] = [];

  for (const field of ["id", "key", "title"] as const) {
    const seen = new Map<string, string>();
    for (const item of entries) {
      const value = item[field];
      const previous = seen.get(value);
      if (previous !== undefined) {
        problems.push(
          `catalog duplicate ${field} ${JSON.stringify(value)}: ${previous}, ${item.id}`,
        );
      } else {
        seen.set(value, item.id);
      }
    }
  }

  return problems;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const results = packIds().map(entry);
  const entries = results
    .map((result) => result.entry)
    .filter((value): value is CatalogEntry => value !== null);
  const problems = [...results.flatMap((result) => result.problems), ...uniqueness(entries)];

  for (const problem of problems) console.error(`✖ ${problem}`);

  if (args.includes("--check")) {
    if (problems.length === 0) {
      console.log(`✓ ${entries.length} pack(s) have consistent catalogue metadata.`);
    }
    process.exit(problems.length === 0 ? 0 : 1);
  }

  if (problems.length > 0) process.exit(1);

  const out = args.find((arg) => !arg.startsWith("--")) ?? "catalog.json";
  const catalogue = { repository: REPOSITORY_URL, packs: entries };
  writeFileSync(out, `${JSON.stringify(catalogue, null, 2)}\n`);
  console.log(`✓ wrote ${entries.length} pack(s) to ${out}`);
}
