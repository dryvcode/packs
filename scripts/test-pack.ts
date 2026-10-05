#!/usr/bin/env bun
/**
 * Render each pack's test fixture through the Dryv CLI and run its checks.
 *
 *   bun scripts/test-pack.ts inject/persistence/typeorm-entities [...]
 *   bun scripts/test-pack.ts --all
 *   bun scripts/test-pack.ts --keep <pack>
 *
 * Every pack test receives the same fixtures/dryv.ir.yaml. Pack-specific fixture files
 * remain under tests/fixture/. Reusable non-IR fixture mappings live centrally in
 * fixtures/manifest.json.
 *
 * DRYV_API_URL defaults to http://127.0.0.1:8750.
 * DRYV_CLI may point at a local current CLI, for example:
 *   bun ../dryv/source/apps/cli/bin/dryv.ts
 */
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

import { FIXTURES, PACKS, REPO, packIds, portableRelative } from "./lib/repository.ts";

type FixtureManifest = {
  packs?: Record<string, Record<string, string>>;
};

function cliCommand(): string[] {
  const configured = process.env.DRYV_CLI?.trim();
  if (configured) {
    return configured.split(/\s+/).map((part) =>
      part.startsWith(".") && existsSync(resolve(REPO, part)) ? resolve(REPO, part) : part,
    );
  }

  const sibling = resolve(REPO, "../dryv/source/apps/cli/bin/dryv.ts");
  if (existsSync(sibling)) return ["bun", sibling];

  throw new Error(
    "No current Dryv CLI found. Set DRYV_CLI or keep the dryv repository beside packs.",
  );
}

const CLI = cliCommand();
const API_URL = process.env.DRYV_API_URL ?? "http://127.0.0.1:8750";
const FIXTURE_MANIFEST = JSON.parse(
  readFileSync(join(FIXTURES, "manifest.json"), "utf8"),
) as FixtureManifest;

function run(command: string[], cwd: string): number {
  return Bun.spawnSync(command, { cwd, stdout: "inherit", stderr: "inherit" }).exitCode;
}

function applySharedFixtures(pack: string, project: string): void {
  const mappings = FIXTURE_MANIFEST.packs?.[pack] ?? {};

  for (const [destinationValue, sourceValue] of Object.entries(mappings)) {
    const destination = portableRelative(destinationValue, `${pack} shared fixture destination`);
    const source = portableRelative(sourceValue, `${pack} shared fixture source`);
    const from = join(FIXTURES, source);
    const to = join(project, destination);

    if (!existsSync(from)) {
      throw new Error(`${pack}: shared fixture does not exist: fixtures/${source}`);
    }
    if (existsSync(to)) {
      throw new Error(
        `${pack}: shared fixture would overwrite pack-local fixture: ${destination}`,
      );
    }

    mkdirSync(dirname(to), { recursive: true });
    cpSync(from, to, { recursive: true });
  }
}

function prepare(pack: string): string {
  const fixture = join(PACKS, pack, "tests", "fixture");
  if (!existsSync(fixture)) {
    throw new Error(`${pack}: no tests/fixture directory`);
  }

  const privateIr = join(fixture, "dryv.ir.yaml");
  if (existsSync(privateIr)) {
    throw new Error(
      `${pack}: pack-local dryv.ir.yaml is forbidden; extend fixtures/dryv.ir.yaml instead`,
    );
  }

  const project = mkdtempSync(join(tmpdir(), `dryv-pack-${pack.replaceAll("/", "-")}-`));
  cpSync(fixture, project, { recursive: true });
  cpSync(join(FIXTURES, "dryv.ir.yaml"), join(project, "dryv.ir.yaml"));
  applySharedFixtures(pack, project);

  cpSync(PACKS, join(project, "packs"), {
    recursive: true,
    filter: (path) => {
      const parts = relative(PACKS, path).split("/");
      return parts[3] !== "tests";
    },
  });

  // The CLI loads the workspace through git, so the temporary project must be a repository.
  run(["git", "init", "-q"], project);
  run(["git", "add", "-A"], project);
  return project;
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const keep = args.includes("--keep");
  const named = args.filter((arg) => !arg.startsWith("--"));
  const packs = args.includes("--all") ? packIds() : named;

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
    let project: string;

    try {
      project = prepare(pack);
    } catch (error) {
      console.error(`✖ ${error instanceof Error ? error.message : String(error)}`);
      failures.push(pack);
      continue;
    }

    const generated = run([...CLI, "generate", "--yes", "--api", API_URL], project);
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
