#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { PACKS, parsePackId, releaseRef } from "./lib/repository.ts";

const tag = process.argv[2]?.trim();
if (!tag) {
  console.error("usage: bun scripts/release-tag.ts <layout>/<purpose>/<name>/v<version>");
  process.exit(2);
}

const split = tag.lastIndexOf("/v");
if (split <= 0) {
  console.error(\`invalid release tag: \${tag}\`);
  process.exit(1);
}

const pack = tag.slice(0, split);
const version = tag.slice(split + 2);

try {
  parsePackId(pack);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (!version) {
  console.error(\`release tag has no version: \${tag}\`);
  process.exit(1);
}

const manifestPath = join(PACKS, pack, "dryv.pack.yaml");
if (!existsSync(manifestPath)) {
  console.error(\`no pack manifest at packs/\${pack}/dryv.pack.yaml\`);
  process.exit(1);
}

const manifest = Bun.YAML.parse(readFileSync(manifestPath, "utf8")) as {
  info?: { version?: string };
};
const actual = manifest.info?.version;
if (actual !== version) {
  console.error(\`release tag version \${version} does not match pack info.version \${actual ?? "<missing>"}\`);
  process.exit(1);
}

if (releaseRef(pack, version) !== tag) {
  console.error(\`release tag is not canonical: expected \${releaseRef(pack, version)}\`);
  process.exit(1);
}

console.log(\`pack=\${pack}\`);
console.log(\`version=\${version}\`);
console.log(\`name=\${pack.replaceAll("/", "-")}\`);
