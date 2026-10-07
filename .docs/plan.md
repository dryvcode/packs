# Packs repository plan

Status: **current execution plan**

Updated: **2026-10-07**

The repository already uses the target top-level pack layouts:

```text
packs/
├── inject/
└── unit/
```

The active work is now tracked only under:

```text
.docs/tasks/pack-modernization/
```

Historical architecture planning lives under `.docs/_archives/` and is not implementation guidance.

## Current sequence

### Stage A — finish repository identity

1. audit every real pack's layout role and terminal name;
2. simplify redundant names;
3. make manifest keys/IDs consistent and layout-aware;
4. update every fixture/shared/catalogue/release/source reference;
5. run repository checks.

This stage is structural only. Do not redesign framework templates.

### Stage B — NestJS reference-quality pass

After Stage A:

1. research current NestJS architecture and native generator conventions;
2. fully audit `inject/backend/nestjs`;
3. fully audit `unit/backend/nestjs`;
4. bring both `dryv.pack.yaml` files to the current Dryv contract;
5. bring their `dryv.example.yaml` guidance to the current Usage+`$options` model;
6. split feature implementation from root application assembly cleanly;
7. generate a real NestJS project;
8. verify it with the native NestJS/TypeScript toolchain.

Only after this proof should another framework receive a full architecture-quality pass.

## Pack identity

Canonical ID:

```text
<layout>/<purpose>/<name>
```

Canonical layouts:

```text
inject
unit
```

Meaning:

```text
inject
  contributes implementation artifacts into a unit

unit
  establishes and owns a generated unit root
```

The terminal name should be the smallest stable discriminator within its parent layout/purpose.

## Framework-quality rule

Runtime IR remains framework-neutral.

Packs own implementation architecture.

Therefore generated file/folder structures should follow the target framework's real conventions rather than a Dryv-wide controller/service/model taxonomy.

Dryv consistency means consistent contracts, not identical filesystem layouts.

## Repository model

```text
packs/       portable pack implementations
fixtures/    shared reusable test inputs
shared/      canonical reusable portable assets/fragments
scripts/     discovery, catalogue, release and verification tooling
.docs/       current guidance, tasks and historical archive
```

## Repository checks

```bash
bun run shared:check
bun run catalog:check
bun run test:packs
```

Native framework verification is additionally required during framework-quality tasks.

## Non-negotiable rules

- work on `develop`; CI runs on `main`;
- all contracts remain `v1alpha1`;
- Runtime IR is the only semantic authority;
- pack identity comes from one repository model;
- catalogue metadata is derived from manifests;
- packs remain portable and independently releasable;
- framework-specific architecture stays in packs;
- missing generic Dryv capabilities are fixed generically, never with hidden framework hacks;
- do not broaden the current task set beyond repository identity + NestJS quality.

See [the active modernization tasks](tasks/pack-modernization/README.md).
