# 02 — Repository rename/move and identity verification

Status: **in progress** — NestJS slice done; remaining renames wait on Task 01 naming decisions

## Goal

Apply the approved identity table from Task 01 once, then make every repository reference consistent.

The repository already uses only:

```text
packs/inject/**
packs/unit/**
```

This task finishes pack placement only where Task 01 proves a pack is under the wrong layout, and otherwise focuses on terminal names, keys and references.

## For every changed pack

Update together:

- directory path;
- `dryv.pack.yaml` `layout` if the role changes;
- `dryv.pack.yaml` key;
- Usage fixtures;
- `dryv.example.yaml`;
- fixture mappings;
- shared asset mappings;
- shared fragment mappings;
- tests;
- source/path references;
- catalogue expectations;
- release-tag expectations;
- active docs.

No compatibility aliases or duplicate old folders.

## Package identity

Layout and ecosystem package identity are separate.

Keep package metadata when the generated unit genuinely has a native package identity.

Do not retain or remove package metadata merely because a pack is under `unit`.

## Ownership

Managed/scaffold ownership remains resource-level behavior.

A rename/move must not silently change generated ownership.

## Do not redesign frameworks here

This task is intentionally mechanical.

Do not use it to restructure:

- NestJS modules/controllers/services;
- Flutter layers;
- Spring packages;
- Next.js routes;
- any other generated architecture.

The first framework-quality redesign begins only in Task 03.

## Required repository assertions

After completion:

```text
only packs/inject and packs/unit exist
all real manifests use layout: inject | unit
terminal names follow the approved naming table
manifest keys are layout-aware
all fixture/source/shared references use target IDs
all release refs use target IDs
no active docs teach superseded IDs
```

Historical archive files may retain old names.

## Verification

Run:

```bash
bun run shared:check
bun run catalog:check
```

Then:

```bash
bun run test:packs
```

when the current Dryv Engine is compatible with the migrated contracts.

Fix identity/path failures caused by this task.

Do not absorb unrelated framework-output failures into this migration.

## Completion report

Record:

- packs renamed;
- packs moved between layouts, if any;
- keys changed;
- package identities retained/removed;
- fixture/shared mappings changed;
- stale references removed;
- repository verification results.

## Progress — NestJS slice (2026-10-07)

Applied for the packs NestJS uses or targets:

| Current ID | Target ID | Key |
| --- | --- | --- |
| `inject/persistence/typeorm-entities` | `inject/persistence/typeorm` | `inject.persistence.typeorm` |
| `inject/persistence/mongoose-models` | `inject/persistence/mongoose` | `inject.persistence.mongoose` |
| `inject/validation/class-validator-dtos` | `inject/validation/class-validator` | `inject.validation.class-validator` |
| `inject/validation/zod-schemas` | `inject/validation/zod` | `inject.validation.zod` |
| `inject/validation/joi-schemas` | `inject/validation/joi` | `inject.validation.joi` |

No layout moves; package identity unchanged. Shared asset/fragment mappings, fixtures and active docs updated.

Contract alignment done with it:

- every manifest keeps catalogue metadata under `info` (the top-level `catalog` block is removed in Dryv);
- `js-prettier-actions` uses flat `actions` with `stage`;
- NestJS templates compare validation packs by full key (`inject.validation.zod`, `inject.validation.joi`);
- the five fixtures use the current Usage shape (`source: { $ref, path }`, flat destinations).

Verification: `shared:check` and `catalog:check` pass; `test:packs` passes for all five packs.

The `feature` template's `output.symbol` + `output.symbols` conflict was resolved on 2026-10-07 by an Engine contract change (Dryv `5b3c6c0d`): a template may declare both, and a provider template must still declare `output.symbol`.

## Progress — reference and fixture cleanup (2026-10-10)

- READMEs and fixtures that still named `package/…` or `project/…` pack paths now use `unit/…` (18 files).
- Ten fixtures moved to the current Usage shape: code destinations directly under `destinations`, and `source: { $ref, path }`. All 17 pack fixtures now pass the Engine Usage contract.
- 17 manifests used `#/inputs.<name>`; they now use `#/inputs/<name>`.
- Docs point at the real shared fixture location, `shared/fixtures/`.

Still open:

- 50 unit manifests declare a literal `package.name` (for example `dryv-cohttp-backend`). The Engine contract requires an input reference (`{ $ref: "#/inputs/<name>" }`), so these packs fail to load until each gets a declared input. Naming that input and its default is a pack design decision.
- `unit/persistence/active-record-models` (`package-index`) and `unit/persistence/sqlalchemy-models` (`models-index`) declare both a top-level `$ref` and `exports`, which the Engine rejects.
- the remaining packs in the Task 01 candidate table.
