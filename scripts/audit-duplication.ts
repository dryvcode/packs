#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

import {
  FIXTURES,
  PACKS,
  REPO,
  SHARED,
  packIds,
  portableRelative,
} from "./lib/repository.ts";

type SharedAssets = Record<string, string[]>;
type SharedFragment = { marker: string; targets: string[] };
type SharedFragments = Record<string, SharedFragment>;
type FixtureManifest = {
  packs?: Record<string, Record<string, string>>;
};

function files(root: string): string[] {
  const found: string[] = [];

  function visit(directory: string): void {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) found.push(path);
    }
  }

  visit(root);
  return found.sort();
}

function digest(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function signature(value: unknown): string {
  return JSON.stringify(value);
}

const sharedAssets = JSON.parse(
  readFileSync(join(SHARED, "assets.json"), "utf8"),
) as SharedAssets;
const sharedFragments = JSON.parse(
  readFileSync(join(SHARED, "fragments.json"), "utf8"),
) as SharedFragments;
const fixtureManifest = JSON.parse(
  readFileSync(join(FIXTURES, "manifest.json"), "utf8"),
) as FixtureManifest;

const targetSource = new Map<string, string>();
for (const [source, targets] of Object.entries(sharedAssets)) {
  for (const target of targets) targetSource.set(target, source);
}

const fragmentAllow = new Map<string, Set<string>>();
for (const [source, fragment] of Object.entries(sharedFragments)) {
  const sourcePath = join(SHARED, portableRelative(source, "shared fragment source"));
  if (!existsSync(sourcePath)) continue;

  const parsed = Bun.YAML.parse(readFileSync(sourcePath, "utf8")) as Record<string, unknown>;
  for (const [key, value] of Object.entries(parsed)) {
    const id = `${key}:${signature(value)}`;
    const allowed = fragmentAllow.get(id) ?? new Set<string>();
    for (const target of fragment.targets) allowed.add(target);
    fragmentAllow.set(id, allowed);
  }
}

const knownPacks = new Set(packIds());
const problems: string[] = [];
const packFiles = files(PACKS).map((path) => relative(REPO, path));

if (!existsSync(join(FIXTURES, "dryv.ir.yaml"))) {
  problems.push("fixtures/dryv.ir.yaml is missing");
}

for (const path of packFiles.filter((path) => path.endsWith("/tests/fixture/dryv.ir.yaml"))) {
  problems.push(`pack-local Runtime IR fixture is forbidden: ${path}`);
}

for (const path of packFiles.filter((path) => path.endsWith("/tests/shared-fixtures.json"))) {
  problems.push(`pack-local shared fixture mapping is forbidden: ${path}`);
}

for (const [pack, mappings] of Object.entries(fixtureManifest.packs ?? {})) {
  if (!knownPacks.has(pack)) {
    problems.push(`fixtures/manifest.json references unknown pack: ${pack}`);
  }

  for (const [destinationValue, sourceValue] of Object.entries(mappings)) {
    try {
      portableRelative(destinationValue, `${pack} fixture destination`);
      const source = portableRelative(sourceValue, `${pack} fixture source`);
      if (!existsSync(join(FIXTURES, source))) {
        problems.push(`${pack}: missing shared fixture fixtures/${source}`);
      }
    } catch (error) {
      problems.push(error instanceof Error ? error.message : String(error));
    }
  }
}

const risky = packFiles.filter(
  (path) => path.includes("/templates/") || path.includes("/tests/fixture/"),
);
const groups = new Map<string, string[]>();

for (const path of risky) {
  const hash = digest(join(REPO, path));
  const group = groups.get(hash) ?? [];
  group.push(path);
  groups.set(hash, group);
}

for (const group of groups.values()) {
  if (group.length < 2) continue;

  const allTemplates = group.every((path) => path.includes("/templates/"));
  const sources = new Set(group.map((path) => targetSource.get(path)).filter(Boolean));

  if (allTemplates && sources.size === 1 && group.every((path) => targetSource.has(path))) {
    continue;
  }

  problems.push(
    `unmanaged exact duplicate pack asset:\n  ${group.join("\n  ")}\n` +
      "  centralize test data under fixtures/ or template assets under shared/assets.json",
  );
}

const repeatedManifestSections = new Map<string, { key: string; paths: string[] }>();
for (const id of packIds()) {
  const path = `packs/${id}/dryv.pack.yaml`;
  const document = Bun.YAML.parse(readFileSync(join(REPO, path), "utf8")) as Record<string, unknown>;

  for (const key of ["choose", "actions", "dependencies"]) {
    const value = document[key];
    if (value === undefined) continue;

    const groupId = `${key}:${signature(value)}`;
    const group = repeatedManifestSections.get(groupId) ?? { key, paths: [] };
    group.paths.push(path);
    repeatedManifestSections.set(groupId, group);
  }
}

for (const [groupId, group] of repeatedManifestSections) {
  if (group.paths.length < 2) continue;

  const allowed = fragmentAllow.get(groupId);
  if (allowed && group.paths.every((path) => allowed.has(path))) continue;

  problems.push(
    `unmanaged duplicate manifest section '${group.key}':\n  ${group.paths.join("\n  ")}\n` +
      "  centralize repository-wide manifest policy under shared/manifests/ and shared/fragments.json",
  );
}

for (const [target, source] of targetSource) {
  if (!existsSync(join(REPO, target))) {
    problems.push(`mapped shared target is missing: ${target}`);
  }
  if (!existsSync(join(SHARED, source))) {
    problems.push(`mapped shared source is missing: shared/${source}`);
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`✖ ${problem}`);
  process.exit(1);
}

console.log(
  "✓ shared fixtures, portable assets and repeated manifest policy have no unmanaged risky duplication.",
);
