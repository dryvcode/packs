import { expect, test } from "bun:test";
import { createHash } from "node:crypto";

import {
  bundle,
  describe,
  packageId,
  packageName,
} from "./lib/registry.ts";
import { packIds } from "./lib/repository.ts";

const id = packIds()[0]!;

test("a Platform release descriptor identifies an immutable versioned archive", () => {
  const descriptor = describe(id);
  const archive = bundle(id, descriptor.commit);

  expect(descriptor.commit).toMatch(/^[0-9a-f]{40}$/);
  expect(descriptor.readme.length).toBeGreaterThan(0);
  expect(descriptor.bundle.sha256).toMatch(/^[0-9a-f]{64}$/);
  expect(descriptor.bundle.sha256).toBe(
    createHash("sha256").update(archive).digest("hex"),
  );
  expect(descriptor.source.ref).toBe(descriptor.commit);
  expect(descriptor.bundle.key).toBe(
    `packs/${packageId(id)}/${descriptor.version}/bundle.tar.gz`,
  );
});

test("official NestJS pack names are independent from their grouping IDs", () => {
  expect(packageId("inject/backend/nestjs")).toBe("@dryv/nestjs");
  expect(packageId("unit/backend/nestjs")).toBe("@dryv/nestjs-app");
  expect(packageName("unit/backend/nestjs")).toBe("nestjs-app");
});
