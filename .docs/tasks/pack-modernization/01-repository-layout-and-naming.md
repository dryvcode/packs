# 01 — Repository layout and naming migration

Status: **ready**

## Goal

Prepare and execute the repository-wide identity model change:

```text
inject | package | project
        ↓
inject | unit
```

while simplifying redundant terminal names.

This task is structural only.

Do not redesign framework templates in this task.

## Preconditions

Dryv `dryv.pack/v1alpha1` must accept:

```yaml
layout: inject
```

and:

```yaml
layout: unit
```

Old `package` and `project` spellings must not remain the desired contract.

If Dryv still blocks the new layout, stop the move and fix the Dryv contract first.

## Identity rules

Canonical path and ID:

```text
<layout>/<purpose>/<name>
```

Canonical manifest key:

```text
<layout>.<purpose>.<name>
```

The same terminal name may exist in both layouts.

Example:

```text
inject/backend/nestjs
unit/backend/nestjs
```

## Naming audit

For every pack, determine the smallest stable terminal discriminator.

Remove suffixes that merely repeat layout/purpose.

Representative migrations:

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

package/backend/spring-boot-backend
→ unit/backend/spring

package/backend/fastapi-backend
→ unit/backend/fastapi

package/clients/dart-client-sdk
→ unit/clients/dart

package/clients/ts-api-client
→ unit/clients/typescript

package/testing/postman-collection
→ unit/testing/postman

package/testing/bruno-collection
→ unit/testing/bruno

package/testing/k6-smoke-tests
→ unit/testing/k6

package/documentation/openapi
→ unit/documentation/openapi

project/backend/nestjs-app
→ unit/backend/nestjs

project/frontend/flutter-app
→ unit/frontend/flutter

project/frontend/nextjs-app
→ unit/frontend/nextjs

project/frontend/react-native-app
→ unit/frontend/react-native
```

These are examples, not a blind rename table. Audit genuine variants before shortening.

## Repository tooling to update first

Inspect and update:

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

Any identity/path logic must use the same `inject | unit` model.

Do not maintain parallel identity rules.

## Acceptance

Before moving directories, prove repository tooling recognizes:

```text
inject/<purpose>/<name>
unit/<purpose>/<name>
```

and rejects obsolete layout identities where appropriate.

No template redesign is required for acceptance.
