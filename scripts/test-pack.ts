#!/usr/bin/env bun
/**
 * Render each pack's test fixture through the Dryv CLI and run its checks.
 *
 *   bun scripts/test-pack.ts inject/persistence/typeorm-entities [...]
 *   bun scripts/test-pack.ts --all
 *   bun scripts/test-pack.ts --keep <pack>     # keep the rendered project to inspect it
 *
 * For each pack under packs/<layout>/<purpose>/<name> with tests/check.sh:
 *   1. copy tests/fixture/ into a temporary project, with the whole packs/ tree under
 *      packs/ and tests/dryv.ir.yaml as dryv.ir.yaml (unless the fixture brings its own);
 *   2. run `dryv generate --yes --no-actions` against the engine at DRYV_API_URL (each
 *      check.sh installs what it needs, so pack actions don't run here);
 *   3. run tests/check.sh inside the project; a non-zero exit fails the pack.
 *
 * DRYV_API_URL defaults to http://127.0.0.1:8750 (CI runs the engine image there).
 * DRYV_CLI overrides the CLI command, e.g. `bun ../dryv/source/apps/cli/bin/dryv.ts` to test
 * against a local Dryv checkout instead of the pinned @dryvcode/cli.
 */
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";

const REPO = resolve(import.meta.dir, "..");
const PACKS = join(REPO, "packs");
const CLI = process.env.DRYV_CLI?.trim()
  ? process.env.DRYV_CLI.trim().split(/\s+/).map((part) =>
      part.startsWith(".") && existsSync(resolve(REPO, part)) ? resolve(REPO, part) : part
    )
  : [join(REPO, "node_modules", ".bin", "dryv")];
const API_URL = process.env.DRYV_API_URL ?? "http://127.0.0.1:8750";

function allPacks(): string[] {
  const packs: string[] = [];
  for (const layout of readdirSync(PACKS, { withFileTypes: true })) {
    if (!layout.isDirectory()) continue;
    for (const purpose of readdirSync(join(PACKS, layout.name), { withFileTypes: true })) {
      if (!purpose.isDirectory()) continue;
      for (const pack of readdirSync(join(PACKS, layout.name, purpose.name), { withFileTypes: true })) {
        if (pack.isDirectory() && existsSync(join(PACKS, layout.name, purpose.name, pack.name, "dryv.pack.yaml"))) {
          packs.push(`${layout.name}/${purpose.name}/${pack.name}`);
        }
      }
    }
  }
  return packs.sort();
}

function run(command: string[], cwd: string): number {
  return Bun.spawnSync(command, { cwd, stdout: "inherit", stderr: "inherit" }).exitCode;
}

function prepare(pack: string): string {
  const project = mkdtempSync(join(tmpdir(), `dryv-pack-${pack.replaceAll("/", "-")}-`));
  cpSync(join(PACKS, pack, "tests", "fixture"), project, { recursive: true });
  cpSync(PACKS, join(project, "packs"), {
    recursive: true,
    filter: (path) => {
      const parts = relative(PACKS, path).split("/");
      // packs/<layout>/<purpose>/<name>/...: skip fixture tests and pack-only dryv.yaml.
      return !(parts[3] === "tests" || (parts.length === 4 && parts[3] === "dryv.yaml"));
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
    console.error("usage: bun scripts/test-pack.ts <layout>/<purpose>/<name> [...] | --all");
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
    const generated = run([...CLI, "generate", "--yes", "--no-actions", "--api", API_URL], project);
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
