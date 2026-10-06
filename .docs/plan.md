# Packs repository plan

Status: **current repository maintenance plan** (2026-10-05).

The architectural authority remains Dryv's canonical contracts and the locked historical decisions in [pack-design-decisions.md](pack-design-decisions.md). This file records the current repository shape and maintenance rules.

## Current structure

```text
packs/<layout>/<purpose>/<name>/
fixtures/
shared/
scripts/
.docs/
```

| Area | Responsibility |
| --- | --- |
| `packs/` | Standalone, portable pack definitions, templates, pack-specific tests and docs |
| `fixtures/` | Repository-wide reusable test inputs; owns the single canonical pack-test Runtime IR |
| `shared/` | Canonical sources for repeated portable assets that must still be copied into released packs |
| `scripts/` | Repository discovery, catalogue projection, shared-asset sync, duplication audits and fixture harness |
| `.docs/` | Current repository guidance and ecosystem planning |

## Pack identity

A pack ID is always:

`<layout>/<purpose>/<name>`

Examples:

- `inject/persistence/typeorm-entities`
- `package/clients/ts-api-client`
- `project/frontend/flutter-app`

Release tags use that complete ID:

`<layout>/<purpose>/<name>/v<version>`

Example:

`inject/persistence/typeorm-entities/v0.1.0`

The same convention is used by the catalogue and release tooling. Do not maintain a second tag convention.


## Roadmap: simplify pack layouts

**Decision direction (2026-10-06):** stress testing of the current packs and Dryv Engine contract shows that `inject | package | project` mixes independent concerns. The planned direction is to reduce runtime layout to two behaviors:

```text
inject
unit
```

This is **not implemented yet**. Until the Dryv `dryv.pack/v1alpha1` contract is rewritten, the repository continues to use the current `inject | package | project` folders and manifest values.

### Why

Layout should answer only:

> Does this pack establish/own the generated unit root, or does it contribute into a unit owned elsewhere?

That distinction is binary.

```text
inject
  contributes artifacts to an existing generated or handwritten unit

unit
  establishes the destination's generated unit root
  may receive contributions from inject packs
```

The current `package` versus `project` distinction is not a reliable runtime distinction:

- both establish the same generated-unit/action/dependency boundary;
- editability is already represented per resource through managed versus scaffold ownership;
- current `project` packs are not uniformly scaffold/editable;
- current `package` packs include root-owning bundles such as OpenAPI, Postman and k6 output that are not ecosystem packages.

### Orthogonal concerns

The target model keeps these concerns separate:

| Concern | Planned authority |
| --- | --- |
| contributor vs unit owner | pack `layout`: `inject | unit` |
| generated artifact ownership | resource-level managed/scaffold behavior |
| package/import identity | optional `package` metadata on a unit |
| backend/frontend/client/testing/docs/etc. | catalogue `purpose` and metadata |
| workspace destination | `dryv.yaml` |
| dependencies/actions/choices | generated unit planning |

A root-owning unit may therefore be an application, library, SDK, generated backend, test suite, documentation bundle, API collection or another complete artifact tree without changing Planner layout semantics.

### Expected migration

When the Dryv contract change is approved and implemented in `v1alpha1`, migrate in place:

```text
inject   -> inject
package  -> unit
project  -> unit
```

Then:

1. rename runtime `package | project` layout behavior to one root-owning `unit` behavior;
2. make package/import identity optional and independent of layout;
3. remove artificial package identities from root-owned bundles that are not packages;
4. preserve resource-level managed/scaffold ownership unchanged;
5. preserve explicit `needs`, `provides`, selections, templates, dependencies and actions;
6. update catalogue/release tooling and pack IDs together;
7. migrate repository folders from `packs/package` and `packs/project` to `packs/unit`;
8. update fixtures/tests/docs in the same migration;
9. reject obsolete layout spellings after migration rather than maintaining aliases while still on `v1alpha1`.

Target repository shape:

```text
packs/
├── inject/
│   └── <purpose>/<name>/
└── unit/
    └── <purpose>/<name>/
```

Examples after migration:

```text
inject/persistence/typeorm-entities
inject/validation/zod-schemas
unit/backend/nestjs-app
unit/backend/spring-boot-backend
unit/frontend/flutter-app
unit/clients/dart-client-sdk
unit/testing/postman-collection
unit/documentation/openapi
```

### Guardrail while pending

Do not create a new `project` layout merely because output is editable. Use resource ownership to reason about editability.

Do not classify a root-owning pack as `package` merely because the current contract needs a root-owner category. Before adding substantial new root-owning pack families, account for the planned `unit` migration.

The architectural research and stress test live in the Dryv repository at:

```text
.docs/planning/research/frameworks-design-templating/08-pack-layout-model.md
```

## Catalogue

`dryv.pack.yaml` is the only catalogue metadata source of truth.

The generated catalogue is a projection used for discovery only. It is not committed and is never semantic/runtime authority.

`scripts/catalog.ts`:

- discovers packs through the shared repository utility;
- validates pack ID, key, layout and purpose consistency;
- validates non-empty titles, summaries and language metadata;
- rejects duplicate catalogue IDs, keys and titles;
- produces deterministic sorted metadata arrays;
- emits the canonical release ref for each pack.

Do not create a hand-maintained pack list beside manifests.

## Fixtures

Every pack test receives the exact same:

`fixtures/dryv.ir.yaml`

Pack-local `tests/fixture/dryv.ir.yaml` files are prohibited by the harness and duplication audit.

The shared IR is a broad semantic superset. When a new pack needs another canonical semantic case, extend that file rather than creating another Runtime IR document.

Reusable non-IR test files also live under `fixtures/`. Reuse mappings are declared once in `fixtures/manifest.json`, keyed by canonical pack ID.

Pack-specific test wiring, assertions and toolchain manifests stay under the pack.

## Portable shared assets

Packs must remain independently releasable, so generation-time files cannot depend on sibling packs or repository-only paths.

When several packs need the exact same template/support asset, keep one canonical source under `shared/` and map its portable pack-local copies in `shared/assets.json`.

When several manifests repeat the exact same repository policy block, keep one canonical YAML fragment under `shared/manifests/` and map its marked regions in `shared/fragments.json`.

Synchronize both forms with `bun run shared:sync`, commit the portable copies, and validate with `bun run shared:check`.

This gives maintainers one editable source while release tarballs remain self-contained.

Do not put merely similar framework-specific code into `shared/`.

## Repository checks

```text
bun run shared:check
bun run catalog:check
bun run test:packs
```

`shared:check` verifies synchronized assets and rejects unmanaged exact duplicate templates or pack-local fixture files.

Fixture/toolchain tests are run by the user/local environment when developing packs.

## Release flow

Release validation uses `scripts/release-tag.ts`, which shares the same pack-ID rules as catalogue generation.

A release archive contains the selected pack directory only. Therefore all files needed at generation time must exist inside that pack after shared-asset synchronization.

## Non-negotiable maintenance rules

- Work on `develop`; CI runs on `main`.
- All Dryv contracts stay on `v1alpha1`.
- Runtime IR remains the only semantic authority.
- Catalogue metadata is derived from manifests, never duplicated manually.
- One shared Runtime IR fixture is used by all pack tests.
- Exact reusable assets have one canonical source.
- Packs remain standalone and portable after synchronization.
- Framework-specific mappings stay inside packs.
- Similar code is not centralized unless it represents the same contract/asset.
- Missing Engine/context semantics are reported instead of hidden in pack conventions.
- Generic backend project packs remain deferred while server-side operation capability composition is unresolved; see [backend project composition](planning/backend-project-composition.md).
