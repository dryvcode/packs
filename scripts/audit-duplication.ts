#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

import { PACKS, REPO, SHARED } from "./lib/repository.ts";

type SharedAssets = Record<string, string[]>;

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

const sharedManifest = JSON.parse(readFileSync(join(SHARED, "assets.json"), "utf8")) as SharedAssets;
const synchronizedTargets = new Set(Object.values(sharedManifest).flat());
const problems: string[] = [];

const packFiles = files(PACKS).map((path) => relative(REPO, path));

for (const path of packFiles.filter((path) => path.endsWith("/tests/fixture/dryv.ir.yaml"))) {
  problems.push(\`pack-local Runtime IR fixture is forbidden: \${path}\`);
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
  if (allTemplates && group.every((path) => synchronizedTargets.has(path))) continue;

  problems.push(
    \`unmanaged exact duplicate pack asset:\\n  \${group.join("\\n  ")}\\n\` +
      "  centralize test data under fixtures/ or template assets under shared/assets.json",
  );
}

for (const target of synchronizedTargets) {
  if (!existsSync(join(REPO, target))) {
    problems.push(\`mapped shared target is missing: \${target}\`);
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(\`✖ \${problem}\`);
  process.exit(1);
}

console.log("✓ no unmanaged exact duplicate templates or pack-local fixture files.");
