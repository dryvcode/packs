import { existsSync, readdirSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

export const REPO = resolve(import.meta.dir, "../..");
export const PACKS = join(REPO, "packs");
export const FIXTURES = join(REPO, "fixtures");
export const SHARED = join(REPO, "shared");
export const REPOSITORY_URL = "https://github.com/dryvcode/packs";

export type PackLayout = "inject" | "package" | "project";

export function packIds(): string[] {
  const found: string[] = [];
  for (const layout of readdirSync(PACKS, { withFileTypes: true })) {
    if (!layout.isDirectory()) continue;
    for (const purpose of readdirSync(join(PACKS, layout.name), { withFileTypes: true })) {
      if (!purpose.isDirectory()) continue;
      for (const pack of readdirSync(join(PACKS, layout.name, purpose.name), { withFileTypes: true })) {
        if (
          pack.isDirectory() &&
          existsSync(join(PACKS, layout.name, purpose.name, pack.name, "dryv.pack.yaml"))
        ) {
          found.push(`${layout.name}/${purpose.name}/${pack.name}`);
        }
      }
    }
  }
  return found.sort();
}

export function parsePackId(id: string): { layout: PackLayout; purpose: string; name: string } {
  const parts = id.split("/");
  if (
    parts.length !== 3 ||
    !["inject", "package", "project"].includes(parts[0]) ||
    !parts[1] ||
    !parts[2]
  ) {
    throw new Error(`invalid pack id: ${id}`);
  }
  return { layout: parts[0] as PackLayout, purpose: parts[1], name: parts[2] };
}

export function portableRelative(value: string, label: string): string {
  if (!value || value.includes("\\") || isAbsolute(value) || value.split("/").includes("..")) {
    throw new Error(`${label} must be a non-empty portable relative path`);
  }
  return value;
}

export function releaseRef(id: string, version: string): string {
  parsePackId(id);
  if (!version.trim()) throw new Error("release version must not be empty");
  return `${id}/v${version}`;
}
