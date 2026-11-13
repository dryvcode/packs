# Folder structure

Status: **current repository structure**

Public packs use:

```text
packs/<layout>/<purpose>/<name>
```

The repository filesystem now has only two top-level pack directories:

```text
packs/
├── inject/
└── unit/
```

This describes the physical tree. The migration is still transitional until every real manifest, key, repository helper, fixture mapping and release identity agrees with `inject | unit`. That reconciliation is the current Stage A task.

## Layout meaning

| Layout | Meaning |
| --- | --- |
| `inject` | Contributes implementation artifacts into a generated or handwritten unit |
| `unit` | Establishes and owns a generated unit root |

Layout is about generation topology.

It is not:

- whether files are editable;
- whether output is an ecosystem package;
- whether the pack generates an application versus documentation;
- a substitute for resource ownership.

Package/import identity is separate metadata.

Managed/scaffold behavior remains resource-level behavior.

## Purpose

The second segment describes what the pack generates, for example:

```text
backend
clients
frontend
persistence
validation
documentation
testing
```

Purpose does not determine layout.

## Terminal name

The final segment should be the smallest stable discriminator within the parent layout/purpose.

Prefer:

```text
inject/persistence/typeorm
inject/validation/zod
unit/backend/nestjs
unit/frontend/flutter
unit/clients/dart
```

rather than repeating parent meaning in suffixes such as `-backend`, `-entities`, `-schemas`, `-client-sdk` or `-app`.

The repository still contains names awaiting this normalization. The active migration is tracked in [pack modernization](tasks/pack-modernization/README.md).

## Repository support folders

```text
shared/
  assets.json
  fragments.json
  templates/
  manifests/
  fixtures/
    dryv.ir.yaml
    manifest.json

scripts/
  lib/repository.ts
  test-pack.ts
  catalog.ts
  sync-shared.ts
  audit-duplication.ts
  release-tag.ts

.docs/
  tasks/
  ecosystems/
  _examples/
  _archives/
```

## Identity

Canonical pack ID:

```text
<layout>/<purpose>/<name>
```

Manifest keys should be layout-aware so the same short technology name may legitimately exist in both layouts:

```text
inject/backend/nestjs
  key: inject.backend.nestjs

unit/backend/nestjs
  key: unit.backend.nestjs
```

See [the active modernization tasks](tasks/pack-modernization/README.md).
