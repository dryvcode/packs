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

The unit's `dryv.example.yaml` exposes choices directly.

A Client could render them like:

```text
Add unit/backend/nestjs

Destination
  apps/backend

Source structure
  ● Feature-oriented
  ○ Central _generated tree
  ○ Type-oriented folders

Validation implementation
  ● Zod
  ○ class-validator
  + show other compatible providers

Package manager
  ● Bun
  ○ pnpm
  ○ npm
  ○ Yarn

Database naming
  ● snake_case
  ○ camelCase

Required capability
  operation.server
  ✓ inject/backend/nestjs
  ✓ TypeScript compatible
  ✓ NestJS compatible
  ✓ provides nestjs-feature-module
  ✓ same generated unit

Persistence
  ✓ inject/persistence/typeorm
  ✓ TypeScript compatible
  ✓ provides typeorm-entity

Review generated configuration? [yes/change/cancel]
```

The selected source-structure option resolves one normal destination `place` map. It changes server, validation and persistence paths together.

The selected validation option resolves one normal pack activation under the stable activation name `validation`.

The selected package-manager and naming options resolve ordinary scalar Usage values.

After resolution there are no `$example` nodes left.

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
