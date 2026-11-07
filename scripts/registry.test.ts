import { expect, test } from "bun:test";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  DirectoryStorage,
  INDEX_KEY,
  changedIds,
  describe,
  publish,
  readIndex,
} from "./lib/registry.ts";
import { packIds } from "./lib/repository.ts";

const id = packIds()[0];

test("a descriptor carries the commit, README and bundle checksum", () => {
  const d = describe(id);
  expect(d.commit).toMatch(/^[0-9a-f]{40}$/);
  expect(d.readme.length).toBeGreaterThan(0);
  expect(d.bundle.sha256).toMatch(/^[0-9a-f]{64}$/);
  expect(d.source.ref).toBe(d.commit);
});

test("publishing is idempotent and keeps the index", async () => {
  const storage = new DirectoryStorage(mkdtempSync(join(tmpdir(), "reg-")));
  const options = { ids: [id], dryRun: false, allowDirty: true };
  expect((await publish(storage, options)).published).toEqual([id]);
  expect((await publish(storage, options)).skipped).toEqual([id]);
  const index = await readIndex(storage);
  expect(index.packs.map((p) => p.id)).toEqual([id]);
  expect(changedIds([id], index)).toEqual([]);
  expect(await storage.get(INDEX_KEY)).not.toBeNull();
});

test("dry run writes nothing", async () => {
  const storage = new DirectoryStorage(mkdtempSync(join(tmpdir(), "reg-")));
  await publish(storage, { ids: [id], dryRun: true, allowDirty: true });
  expect(await storage.get(INDEX_KEY)).toBeNull();
});

test("a pack's files are stored for the viewer and removed files are deleted", async () => {
  const storage = new DirectoryStorage(mkdtempSync(join(tmpdir(), "reg-")));
  await publish(storage, { ids: [id], dryRun: false, allowDirty: true });
  const d = describe(id);
  const viewable = d.files.filter((f) => f.viewable);
  expect(viewable.some((f) => f.path === "dryv.pack.yaml")).toBe(true);
  const stored = await storage.list(`packs/${id}/files/`);
  expect(stored.length).toBe(viewable.length);
});
