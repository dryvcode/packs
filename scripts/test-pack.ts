#!/usr/bin/env bun
/**
 * Render each pack's test fixture through the Dryv CLI and run its checks.
 *
 *   bun scripts/test-pack.ts persistence/typeorm-entities [...]
 *   bun scripts/test-pack.ts --all
 *   bun scripts/test-pack.ts --keep <pack>     # keep the rendered project to inspect it
 *
 * For each pack under packs/<purpose>/<name> with tests/check.sh:
 *   1. copy tests/fixture/ into a temporary project, with the whole packs/ tree under
 *      packs/ and tests/dryv.ir.yaml as dryv.ir.yaml (unless the fixture brings its own);
 *   2. run `dryv generate --yes` against the engine at DRYV_API_URL;
 *   3. run tests/check.sh inside the project; a non-zero exit fails the pack.
 *
 * DRYV_API_URL defaults to http://127.0.0.1:8750 (CI runs the engine image there).
 */
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

const REPO = resolve(import.meta.dir, "..");
const PACKS = join(REPO, "packs");
const CLI = join(REPO, "node_modules", ".bin", "dryv");
const API_URL = process.env.DRYV_API_URL ?? "http://127.0.0.1:8750";

function allPacks(): string[] {
  const packs: string[] = [];
  for (const purpose of readdirSync(PACKS, { withFileTypes: true })) {
    if (!purpose.isDirectory()) continue;
    for (const pack of readdirSync(join(PACKS, purpose.name), { withFileTypes: true })) {
      if (pack.isDirectory() && existsSync(join(PACKS, purpose.name, pack.name, "dryv.pack.yaml"))) {
        packs.push(`${purpose.name}/${pack.name}`);
      }
    }
  }
  return packs.sort();
}

function run(command: string[], cwd: string): number {
  return Bun.spawnSync(command, { cwd, stdout: "inherit", stderr: "inherit" }).exitCode;
}

function prepare(pack: string): string {
  const project = mkdtempSync(join(tmpdir(), `dryv-pack-${pack.replace("/", "-")}-`));
  cpSync(join(PACKS, pack, "tests", "fixture"), project, { recursive: true });
  cpSync(PACKS, join(project, "packs"), {
    recursive: true,
    filter: (path) => {
      const parts = relative(PACKS, path).split("/");
      // packs/<purpose>/<name>/...: skip each pack's tests/ and its orchestration dryv.yaml
      return !(parts[2] === "tests" || (parts.length === 3 && parts[2] === "dryv.yaml"));
    },
  });
  if (!existsSync(join(project, "dryv.ir.yaml"))) {
    cpSync(join(REPO, "tests", "dryv.ir.yaml"), join(project, "dryv.ir.yaml"));
  }
  // The CLI loads the workspace through git, so the project must be a repository.
  run(["git", "init", "-q"], project);
  run(["git", "add", "-A"], project);
  return project;
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const keep = args.includes("--keep");
  const named = args.filter((arg) => !arg.startsWith("--"));
  const packs = args.includes("--all") ? allPacks() : named;
  if (packs.length === 0) {
    console.error("usage: bun scripts/test-pack.ts <purpose>/<name> [...] | --all");
    return 2;
  }
  const failures: string[] = [];
  for (const pack of packs) {
    const checks = join(PACKS, pack, "tests", "check.sh");
    if (!existsSync(checks)) {
      console.error(`✖ ${pack}: no tests/check.sh`);
      failures.push(pack);
      continue;
    }
    console.log(`\n▶ ${pack}`);
    const project = prepare(pack);
    const generated = run([CLI, "generate", "--yes", "--api", API_URL], project);
    const checked = generated === 0 ? run(["bash", checks], project) : generated;
    if (checked === 0) {
      console.log(`✓ ${pack}${keep ? ` (project kept at ${project})` : ""}`);
      if (!keep) rmSync(project, { recursive: true, force: true });
    } else {
      console.error(`✖ ${pack} (project kept at ${project})`);
      failures.push(pack);
    }
  }
  if (failures.length > 0) {
    console.error(`\nFailed: ${failures.join(", ")}`);
    return 1;
  }
  console.log(`\nAll ${packs.length} pack(s) passed.`);
  return 0;
}

process.exit(await main());
