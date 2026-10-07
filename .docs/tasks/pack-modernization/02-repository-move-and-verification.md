# 02 — Repository move and identity verification

Status: **blocked by Task 01**

## Goal

Move and rename every real pack exactly once after repository tooling understands the target identity model.

## Mechanical layout migration

```text
packs/inject/**  -> packs/inject/**
packs/package/** -> packs/unit/**
packs/project/** -> packs/unit/**
```

Do not keep aliases or duplicate compatibility folders.

## Update with every moved pack

Update all references to the canonical pack ID:

- `dryv.pack.yaml` layout;
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
- docs.

## Package identity

Moving a former `package` pack to `unit` does not mean deleting real package identity.

Keep package metadata when the generated unit genuinely has ecosystem package identity, such as:

- npm package;
- Dart package;
- Python package;
- Rust crate;
- Maven/Gradle artifact;
- other package identities required by native tooling/imports.

Remove artificial package identity only when it existed solely because the old layout required it.

Do not mix that cleanup with unrelated template redesign.

## Ownership

Managed/scaffold ownership remains resource-level behavior.

The layout move must not silently change which generated files are managed or scaffold-owned.

## Required repository assertions

After the migration:

```text
packs/package/ does not exist
packs/project/ does not exist
all real pack manifests use layout: inject | unit
all canonical keys are layout-aware
all fixture/source references use new IDs
all release refs use new IDs
```

Search active files for obsolete IDs and fix them.

Historical archive files may retain old names.

## Verification

Run:

```bash
bun run shared:check
bun run catalog:check
```

Then, when Dryv Engine is compatible:

```bash
bun run test:packs
```

Fix path/identity failures caused by the migration.

Do not fix framework-quality issues yet unless they are required to make the structural migration valid.

## Completion report

Record:

- number of inject packs kept/moved;
- number of package packs moved to unit;
- number of project packs moved to unit;
- renamed pack IDs;
- package identities retained/removed;
- fixture/shared mapping changes;
- verification results.
