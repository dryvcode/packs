#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";

import { PACKS, REPO, SHARED } from "./lib/repository.ts";

type SharedAssets = Record<string, string[]>;

function portable(value: string, label: string): string {
  if (!value || value.includes("\\\\") || isAbsolute(value) || value.split("/").includes("..")) {
    throw new Error(\`\${label} must be a non-empty portable relative path\`);
  }
  return value;
}

const check = process.argv.includes("--check");
const manifest = JSON.parse(readFileSync(join(SHARED, "assets.json"), "utf8")) as SharedAssets;
const seenTargets = new Set<string>();
const problems: string[] = [];
let synchronized = 0;

for (const [sourceValue, targetValues] of Object.entries(manifest)) {
  const source = portable(sourceValue, "shared source");
  const sourcePath = join(SHARED, source);
  if (!existsSync(sourcePath)) {
    problems.push(\`missing shared source: shared/\${source}\`);
    continue;
  }
  const sourceContent = readFileSync(sourcePath);

  for (const targetValue of targetValues) {
    const target = portable(targetValue, "shared target");
    const targetPath = join(REPO, target);
    if (!targetPath.startsWith(PACKS + "/")) {
      problems.push(\`shared target must be inside packs/: \${target}\`);
      continue;
    }
    if (seenTargets.has(target)) {
      problems.push(\`shared target is mapped more than once: \${target}\`);
      continue;
    }
    seenTargets.add(target);

    if (check) {
      if (!existsSync(targetPath)) {
        problems.push(\`missing synchronized target: \${target}\`);
      } else if (!readFileSync(targetPath).equals(sourceContent)) {
        problems.push(\`shared target drifted: \${target} <- shared/\${source}\`);
      }
      continue;
    }

    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, sourceContent);
    console.log(\`✓ \${relative(REPO, targetPath)} <- shared/\${source}\`);
    synchronized++;
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(\`✖ \${problem}\`);
  process.exit(1);
}

if (check) console.log(\`✓ \${seenTargets.size} synchronized shared target(s) match canonical sources.\`);
else console.log(\`✓ synchronized \${synchronized} shared target(s).\`);
