#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import { PACKS, REPO, SHARED, portableRelative } from "./lib/repository.ts";

type SharedAssets = Record<string, string[]>;
type SharedFragment = {
  marker: string;
  targets: string[];
};
type SharedFragments = Record<string, SharedFragment>;

const check = process.argv.includes("--check");
const assets = JSON.parse(readFileSync(join(SHARED, "assets.json"), "utf8")) as SharedAssets;
const fragments = JSON.parse(
  readFileSync(join(SHARED, "fragments.json"), "utf8"),
) as SharedFragments;
const seenAssetTargets = new Set<string>();
const seenFragmentTargets = new Set<string>();
const problems: string[] = [];
let synchronizedAssets = 0;
let synchronizedFragments = 0;

function packTarget(value: string, label: string): string {
  const target = portableRelative(value, label);
  const targetPath = join(REPO, target);
  if (!targetPath.startsWith(PACKS + "/")) {
    throw new Error(`${label} must be inside packs/: ${target}`);
  }
  return target;
}

for (const [sourceValue, targetValues] of Object.entries(assets)) {
  const source = portableRelative(sourceValue, "shared source");
  const sourcePath = join(SHARED, source);
  if (!existsSync(sourcePath)) {
    problems.push(`missing shared source: shared/${source}`);
    continue;
  }

  const sourceContent = readFileSync(sourcePath);

  for (const targetValue of targetValues) {
    let target: string;
    try {
      target = packTarget(targetValue, "shared target");
    } catch (error) {
      problems.push(error instanceof Error ? error.message : String(error));
      continue;
    }

    const targetPath = join(REPO, target);
    if (seenAssetTargets.has(target)) {
      problems.push(`shared target is mapped more than once: ${target}`);
      continue;
    }
    seenAssetTargets.add(target);

    if (check) {
      if (!existsSync(targetPath)) {
        problems.push(`missing synchronized target: ${target}`);
      } else if (!readFileSync(targetPath).equals(sourceContent)) {
        problems.push(`shared target drifted: ${target} <- shared/${source}`);
      }
      continue;
    }

    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, sourceContent);
    console.log(`✓ ${relative(REPO, targetPath)} <- shared/${source}`);
    synchronizedAssets++;
  }
}

for (const [sourceValue, fragment] of Object.entries(fragments)) {
  const source = portableRelative(sourceValue, "shared fragment source");
  const sourcePath = join(SHARED, source);
  if (!existsSync(sourcePath)) {
    problems.push(`missing shared fragment source: shared/${source}`);
    continue;
  }

  const marker = fragment.marker.trim();
  if (!marker || marker.includes("\n")) {
    problems.push(`invalid shared fragment marker for shared/${source}`);
    continue;
  }

  const start = `# shared:${marker}:start`;
  const end = `# shared:${marker}:end`;
  const body = readFileSync(sourcePath, "utf8").trimEnd();
  const expected = `${start}\n${body}\n${end}`;

  for (const targetValue of fragment.targets) {
    let target: string;
    try {
      target = packTarget(targetValue, "shared fragment target");
    } catch (error) {
      problems.push(error instanceof Error ? error.message : String(error));
      continue;
    }

    const mappingKey = `${target}#${marker}`;
    if (seenFragmentTargets.has(mappingKey)) {
      problems.push(`shared fragment target is mapped more than once: ${mappingKey}`);
      continue;
    }
    seenFragmentTargets.add(mappingKey);

    const targetPath = join(REPO, target);
    if (!existsSync(targetPath)) {
      problems.push(`missing shared fragment target: ${target}`);
      continue;
    }

    const targetContent = readFileSync(targetPath, "utf8");
    const startIndex = targetContent.indexOf(start);
    const endIndex = targetContent.indexOf(end, startIndex + start.length);

    if (startIndex < 0 || endIndex < 0) {
      problems.push(`missing shared fragment markers in ${target}: ${marker}`);
      continue;
    }
    if (targetContent.indexOf(start, startIndex + start.length) >= 0) {
      problems.push(`duplicate shared fragment start marker in ${target}: ${marker}`);
      continue;
    }
    if (targetContent.indexOf(end, endIndex + end.length) >= 0) {
      problems.push(`duplicate shared fragment end marker in ${target}: ${marker}`);
      continue;
    }

    const actual = targetContent.slice(startIndex, endIndex + end.length);
    if (check) {
      if (actual !== expected) {
        problems.push(`shared fragment drifted: ${target}#${marker} <- shared/${source}`);
      }
      continue;
    }

    if (actual !== expected) {
      const updated =
        targetContent.slice(0, startIndex) +
        expected +
        targetContent.slice(endIndex + end.length);
      writeFileSync(targetPath, updated);
      console.log(`✓ ${target}#${marker} <- shared/${source}`);
      synchronizedFragments++;
    }
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`✖ ${problem}`);
  process.exit(1);
}

if (check) {
  console.log(
    `✓ ${seenAssetTargets.size} shared file target(s) and ${seenFragmentTargets.size} fragment target(s) match canonical sources.`,
  );
} else {
  console.log(
    `✓ synchronized ${synchronizedAssets} shared file target(s) and ${synchronizedFragments} fragment target(s).`,
  );
}
