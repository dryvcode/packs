#!/usr/bin/env bun
/**
 * Publish packs to the Dryv registry (S3-compatible storage).
 *
 *   bun scripts/publish.ts --dry-run              # what would be published (changed packs)
 *   bun scripts/publish.ts --pack inject/backend/nestjs
 *   bun scripts/publish.ts --all --force            # republish even if the commit is unchanged
 *   bun scripts/publish.ts --all [--skip-invalid]   # publish what is ready, list the rest
 *
 * Settings come from the environment: S3_ENDPOINT, S3_BUCKET (default dryv), S3_PREFIX (default public/),
 * AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION. Set DRYV_API_URL and DRYV_API_KEY to
 * also record each pack in the Dryv API registry. Use --dir <path> to publish
 * into a local folder instead (for testing). Bundles are built from a commit, so commit first.
 */
import {
  DirectoryStorage,
  apiNotifier,
  changedIds,
  publish,
  readIndex,
  s3Storage,
  type Storage,
} from "./lib/registry.ts";
import { packIds } from "./lib/repository.ts";

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const value = (name: string) => {
  const at = args.indexOf(name);
  return at === -1 ? undefined : args[at + 1];
};

const dryRun = flag("--dry-run");
const dir = value("--dir");
const storage: Storage = dir ? new DirectoryStorage(dir) : s3Storage(process.env);

const all = packIds();
const requested = value("--pack");
if (requested && !all.includes(requested)) {
  console.error(`unknown pack: ${requested}`);
  process.exit(2);
}

const ids = requested ? [requested] : flag("--all") ? all : changedIds(all, await readIndex(storage));
if (ids.length === 0) {
  console.log("Nothing to publish: every pack is already published at its latest commit.");
  process.exit(0);
}

const report = await publish(storage, { ids, dryRun, allowDirty: flag("--allow-dirty"),
  skipInvalid: flag("--skip-invalid"),
  force: flag("--force"),
  onPublished: apiNotifier(process.env),
});
const verb = dryRun ? "would publish" : "published";
for (const id of report.published) console.log(`${verb} ${id}`);
for (const id of report.skipped) console.log(`unchanged ${id}`);
for (const problem of report.invalid) console.error(`not publishable: ${problem}`);
