# Pack layout refactor

Status: **scheduled — next structural refactor**

Scheduled on: **2026-10-06**

This is the active packs-repository refactor plan for converging the current
`inject | package | project` layout into the simpler `inject | unit` model.

The architectural reasoning is maintained in the Dryv repository at:

```text
.docs/planning/research/frameworks-design-templating/08-pack-layout-model.md
```

This file owns only the packs-repository migration sequence.

## Goal

Replace:

```text
packs/
├── inject/
├── package/
└── project/
```

with:

```text
packs/
├── inject/
└── unit/
```

The runtime meaning becomes:

```text
inject
  contributes to a generated or handwritten unit

unit
  establishes and owns the generated unit root
```

Package/import identity remains optional metadata on a unit.

Managed/scaffold editability remains resource-level behavior and never determines layout.

## Scheduling rule

This refactor is the **next repository-wide structural migration**.

Do not expand the old layout model while it is pending.

In particular:

- do not add new `project` packs merely because files are editable;
- do not invent package identities for non-package artifact bundles;
- avoid large path/catalogue/release work that would immediately need another migration;
- normal fixes inside existing packs may continue.

## Prerequisite — Dryv contract

The packs repository cannot complete this migration before the Dryv Engine accepts the new contract.

Required Dryv-side change:

```text
dryv.pack/v1alpha1

layout:
  inject | package | project

becomes:

layout:
  inject | unit
```

with optional package metadata for a `unit`.

No `v1alpha2` is introduced.

Old layout spellings should be rewritten in place rather than supported through long-lived compatibility aliases.

## Phase 1 — repository model and tooling

Update repository helpers first so one identity model is used everywhere.

Affected areas include:

- `scripts/lib/repository.ts`;
- pack discovery;
- catalogue projection/checking;
- release-tag validation;
- shared-asset mappings keyed by pack ID;
- fixture mappings keyed by pack ID;
- documentation examples.

Target identity:

```text
<layout>/<purpose>/<name>

layout = inject | unit
```

## Phase 2 — move root-owning packs

Mechanical mapping:

```text
packs/package/** -> packs/unit/**
packs/project/** -> packs/unit/**
```

Keep:

```text
packs/inject/** -> packs/inject/**
```

Do not alter pack semantics merely because the directory moves.

For every moved pack update together:

- path;
- canonical pack/release ID;
- local fixture references;
- shared mappings;
- documentation references;
- catalogue expectations.

## Phase 3 — clean package identity

Audit every former `package` pack.

Keep package identity when the generated unit has a real consumer/toolchain identity, for example:

- Dart package;
- npm package;
- Python package;
- Rust crate;
- Maven/Gradle artifact;
- .NET package/project identity where required.

Remove artificial package identity when the unit is simply a root-owned generated bundle, for example candidates such as:

- Postman collection;
- Bruno collection;
- HTTP smoke suite;
- k6 suite;
- OpenAPI output.

Do not infer package identity from `catalog.purpose`.

## Phase 4 — preserve ownership independently

No managed/scaffold behavior should change as a side effect of the layout migration.

Verify that:

```text
normal resource          -> managed
*.sf[.<renderer>]        -> scaffold
```

works identically for both `inject` and `unit` packs.

A unit may contain all managed files, all scaffold files, or a mixture.

## Phase 5 — update usage fixtures

Update every `tests/fixture/dryv.yaml` and repository example that references:

```text
package/<purpose>/<name>
project/<purpose>/<name>
```

to:

```text
unit/<purpose>/<name>
```

Keep usage explicit. No aliasing or implicit redirect should hide stale pack paths.

## Phase 6 — verification

Repository-level checks after migration:

```text
bun run shared:check
bun run catalog:check
```

Then run the pack harness when the Engine migration is available:

```text
bun run test:packs
```

Also audit:

- no active docs mention `layout: project`;
- no active docs describe `package` as a layout;
- no active pack paths remain under `packs/package` or `packs/project`;
- no release/source examples use old IDs;
- no duplicate/missing shared mappings resulted from moves;
- no pack gained or lost scaffold ownership accidentally.

## Completion condition

The refactor is complete only when:

```text
runtime layouts       inject | unit
repository layouts    inject | unit
pack IDs              inject/... | unit/...
package identity      optional independent metadata
artifact ownership    managed | scaffold per resource
```

and current docs describe only that model.

Historical material may preserve the old model under `.docs/_archives/`, but active guidance must not.
