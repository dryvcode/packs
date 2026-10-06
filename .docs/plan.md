# Packs repository plan

Status: **current repository maintenance plan** (2026-10-06).

Architectural authority remains the current Dryv contracts and research in the Dryv repository. This file records only active packs-repository maintenance and migration work. Historical/superseded material lives under `.docs/_archives/` and is not implementation guidance.

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


## Scheduled structural refactor

The next repository-wide structural refactor is the pack layout convergence:

```text
inject | package | project
            ↓
       inject | unit
```

The repository migration is scheduled in [planning/pack-layout-refactor.md](planning/pack-layout-refactor.md), with naming, thin-unit composition and binding compatibility in [planning/pack-identity-and-composition.md](planning/pack-identity-and-composition.md), plus compact `dryv.example.yaml`, destination output overrides, and import-addressing design in [planning/pack-examples-and-placements.md](planning/pack-examples-and-placements.md).

Until the Dryv `dryv.pack/v1alpha1` contract accepts `inject | unit`, existing pack paths remain valid implementation state. Do not expand the old `project` layout model or use editability as a reason to choose a layout.

The canonical architectural stress test lives in the Dryv repository at:

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
- The `inject | unit` migration is the next structural refactor; do not add new layout categories while it is pending.
