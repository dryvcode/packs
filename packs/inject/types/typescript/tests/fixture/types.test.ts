import { describe, expect, test } from "bun:test";

import type { Metadata } from "./out/commerce/metadata.type.ts";
import type { ActiveStatus } from "./out/core/active-status.type.ts";
import type { Labels } from "./out/core/labels.type.ts";
import type { NamePair } from "./out/core/name-pair.type.ts";
import type { Page } from "./out/core/page.type.ts";
import type { UserCoordinate } from "./out/core/user-coordinate.type.ts";
import type { UserLookup } from "./out/core/user-lookup.type.ts";
import type { UserPage } from "./out/core/user-page.type.ts";
import type { UserProfile } from "./out/core/user-profile.interface.ts";
import { UserStatus } from "./out/core/user-status.enum.ts";

// Compile-time shape checks: tsc fails the pack test if a declaration drifts.
const profile = {
  createdAt: "2026-01-01T00:00:00Z",
  displayName: "Ada",
  externalCustomerId: "c-1",
  id: "u-1",
  status: UserStatus.ACTIVE,
} satisfies UserProfile;
const page = { items: [profile], total: 1 } satisfies UserPage;
const generic = { items: ["a"], total: 1 } satisfies Page<string>;
const lookup: UserLookup = "u-1";
const labels: Labels = { team: "core" };
const metadata: Metadata = { source: "import" };
const coordinate: UserCoordinate = [1.5, 2.5];
const active: ActiveStatus = "active";
const names: NamePair = { firstName: "Ada", lastName: "Lovelace" };

describe("generated TypeScript types", () => {
  test("enums are runtime values with their serialized members", () => {
    expect(Object.values(UserStatus) as string[]).toEqual(["admin_user", "active", "suspended"]);
  });

  test("aliases accept their underlying values", () => {
    expect(page.items[0]?.status).toBe(UserStatus.ACTIVE);
    expect([generic.total, lookup, labels.team, metadata.source, coordinate[1], active, names.lastName]).toEqual([
      1,
      "u-1",
      "core",
      "import",
      2.5,
      "active",
      "Lovelace",
    ]);
  });
});
