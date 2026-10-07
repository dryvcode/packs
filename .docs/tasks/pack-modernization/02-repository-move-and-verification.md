# 02 — Repository rename/move and identity verification

Status: **blocked by Task 01**

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
