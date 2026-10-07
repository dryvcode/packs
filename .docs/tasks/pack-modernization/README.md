# Pack modernization tasks

Status: **active execution plan**

Updated: **2026-10-07**

This folder is the only active execution plan for the current packs-repository modernization.

The work is intentionally split into two stages:

```text
Stage A
  repository structure + identity only

Stage B
  NestJS framework-quality proof
```

Do not broaden Stage A into framework redesigns, and do not begin other framework quality passes until the NestJS proof is complete.

## Locked direction

Repository layouts converge from:

```text
inject | package | project
```

to:

```text
inject | unit
```

Meanings:

```text
inject
  contributes implementation artifacts into a unit

unit
  establishes and owns a generated unit root
```

Canonical pack identity:

```text
<layout>/<purpose>/<name>
```

The terminal name is the smallest stable discriminator inside its layout/purpose.

Prefer:

```text
<technology>
<technology>-<variant>
```

Avoid suffixes that only repeat the parent purpose, for example:

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

when removing the suffix does not lose meaning.

Examples:

```text
inject/backend/nestjs-backend
→ inject/backend/nestjs

inject/persistence/typeorm-entities
→ inject/persistence/typeorm

inject/validation/zod-schemas
→ inject/validation/zod

package/clients/dart-client-sdk
→ unit/clients/dart

project/backend/nestjs-app
→ unit/backend/nestjs
```

Manifest keys are layout-aware:

```text
inject/backend/nestjs -> inject.backend.nestjs
unit/backend/nestjs   -> unit.backend.nestjs
```

The same short name may exist in both layouts.

## Framework-quality rule

Dryv stays framework-neutral.

Packs must be framework-native.

```text
Dryv consistency
  = consistent contracts

not
  identical generated folder/file architecture
```

A framework pack must reproduce the target ecosystem's recommended architecture, file/folder conventions, assembly model, testing surface and native verification expectations.

Do not add framework-specific concepts such as controller/service/module to Runtime IR merely to make one pack easier to implement.

## Active tasks

1. [01 — Repository layout and naming migration](01-repository-layout-and-naming.md)
2. [02 — Repository move and identity verification](02-repository-move-and-verification.md)
3. [03 — NestJS framework baseline](03-nestjs-framework-baseline.md)
4. [04 — NestJS inject pack](04-nestjs-inject-pack.md)
5. [05 — NestJS unit pack](05-nestjs-unit-pack.md)
6. [06 — NestJS composition and example](06-nestjs-composition-and-example.md)
7. [07 — NestJS native verification](07-nestjs-native-verification.md)

Tasks must be completed in order unless a documented blocker requires returning to Dryv Engine work.

## Boundaries

### Stage A may change

- pack directories;
- `layout`;
- canonical pack keys/IDs;
- source/path references;
- catalogue/release identity;
- fixture/shared mappings keyed by pack ID;
- documentation references.

### Stage A must not change

- framework architecture;
- template behavior unless required by the move;
- generated output topology;
- selection semantics;
- template families;
- framework dependency design.

### Stage B may change

Only:

```text
inject/backend/nestjs
unit/backend/nestjs
```

and shared/generic Dryv capabilities strictly required to express those packs correctly.

Do not use the NestJS pass as an excuse to redesign every other pack.

## Verification policy

Repository checks:

```bash
bun run shared:check
bun run catalog:check
```

Pack harness:

```bash
bun run test:packs
```

Native framework verification is mandatory during the NestJS quality pass.

A pack is not reference quality merely because snapshots render.
