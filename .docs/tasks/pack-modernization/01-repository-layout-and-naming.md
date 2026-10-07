# 01 — Repository identity and naming audit

Status: **ready**

## Goal

Finish the repository-wide pack identity cleanup on top of the layout migration that is already physically present.

Current repository layout:

```text
packs/inject/**
packs/unit/**
```

The remaining structural work is primarily:

- simplify redundant terminal names;
- verify each pack is in the correct `inject` or `unit` role;
- make manifest keys/IDs layout-aware and consistent;
- remove stale references to old names.

Do not redesign framework templates in this task.

## Layout rule

```text
inject
  contributes implementation artifacts into a unit

unit
  establishes and owns a generated unit root
```

A pack should only move between `inject` and `unit` if its actual ownership role is wrong.

Do not mechanically relocate packs by purpose.

## Identity rule

Canonical pack ID:

```text
<layout>/<purpose>/<name>
```

Canonical manifest key:

```text
<layout>.<purpose>.<name>
```

The same short name may exist in both layouts.

Example:

```text
inject/backend/nestjs
unit/backend/nestjs
```

## Terminal-name rule

The terminal name is the smallest stable discriminator inside its layout/purpose.

Prefer:

```text
<technology>
<technology>-<variant>
```

Avoid suffixes that merely repeat parent meaning:

```text
-backend
-client-sdk
-entities
-models
-schemas
-validation
-collection
-app
```

when removing them does not lose meaning.

Representative candidates currently visible in the repository:

```text
inject/backend/nestjs-backend
→ inject/backend/nestjs

inject/persistence/typeorm-entities
→ inject/persistence/typeorm

inject/persistence/mongoose-models
→ inject/persistence/mongoose

inject/validation/zod-schemas
→ inject/validation/zod

inject/validation/joi-schemas
→ inject/validation/joi

inject/validation/class-validator-dtos
→ inject/validation/class-validator

unit/backend/nestjs-app
→ unit/backend/nestjs

unit/backend/fastapi-backend
→ unit/backend/fastapi

unit/backend/spring-boot-backend
→ unit/backend/spring

unit/clients/dart-client-sdk
→ unit/clients/dart

unit/clients/ts-api-client
→ unit/clients/typescript

unit/testing/postman-collection
→ unit/testing/postman

unit/testing/bruno-collection
→ unit/testing/bruno

unit/testing/k6-smoke-tests
→ unit/testing/k6

unit/frontend/flutter-app
→ unit/frontend/flutter

unit/frontend/nextjs-app
→ unit/frontend/nextjs

unit/frontend/react-native-app
→ unit/frontend/react-native
```

These are candidates, not a blind rename table.

Audit each name for real variants before shortening.

## Repository tooling audit

Inspect all identity consumers before renaming:

```text
scripts/lib/repository.ts
scripts/catalog.ts
scripts/release-tag.ts
scripts/test-pack.ts
scripts/sync-shared.ts
scripts/audit-duplication.ts
fixtures/manifest.json
shared/assets.json
shared/fragments.json
```

Ensure every helper derives identity from the same canonical path/key model.

## Deliverable

Produce the exact repository-wide rename/move table to execute in Task 02.

For every pack record:

```text
current ID
target ID
current key
target key
layout role confirmed?
package identity retained?
references/mappings affected?
```

Do not modify templates merely to improve generated code quality in this task.
