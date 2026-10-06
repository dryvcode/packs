# Suggested pack composition

Status: **design-only example**

This file demonstrates how a Client could interpret `dryv.example.yaml` when a user adds a pack.

The example is a recommendation, not a hidden dependency declaration.

## Add the NestJS unit

User intent:

```text
dryv pack add unit/backend/nestjs
```

The unit declares:

```text
needs operation.server
  language compatible
  framework compatible
  representation accepted: nestjs-feature-module
  locality: same-unit
```

Its example recommends:

```text
operation.server
  -> inject/backend/nestjs
```

The NestJS inject pack then declares:

```text
needs schema.validation
needs schema.persistence (optional)
```

Its example recommends:

```text
schema.validation
  -> inject/validation/zod

schema.persistence
  -> inject/persistence/typeorm
```

## Proposed CLI presentation

```text
Add unit/backend/nestjs

Destination
  apps/backend

Required capability
  operation.server

Recommended provider
  inject/backend/nestjs
  ✓ TypeScript compatible
  ✓ NestJS compatible
  ✓ provides nestjs-feature-module
  ✓ same generated unit

inject/backend/nestjs requires
  schema.validation

Recommended provider
  inject/validation/zod
  ✓ TypeScript compatible
  ✓ provides zod-schema

Optional capability
  schema.persistence

Recommended provider
  inject/persistence/typeorm
  ✓ TypeScript compatible
  ✓ provides typeorm-entity

Suggested package manager
  bun

Suggested structure
  src/modules/<feature>/controller.ts
  src/modules/<feature>/service.ts
  src/modules/<feature>/module.ts
  src/modules/<group>/dto/<schema>.schema.ts
  src/modules/<group>/entities/<schema>.entity.ts

Apply this composition? [review/change/apply]
```

## Alternative validation provider

If a future pack exists:

```text
inject/validation/class-validator
```

and it provides:

```text
schema.validation
contract: class-validator-dto
language: typescript
```

then it can also be offered because `inject/backend/nestjs` explicitly accepts that representation.

The example may still prefer Zod.

Therefore:

```text
example recommendation != legal-provider whitelist
```

The Engine determines legal compatibility from pack contracts.

The Client uses the example only to rank/propose a known-good composition.

## Alternative project structure

The same pack graph may be materialized using:

```text
usage/dryv.central-generated.yaml
```

or:

```text
usage/dryv.type-oriented.yaml
```

No different NestJS, Zod or TypeORM pack is required.
