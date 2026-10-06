# Proposed pack architecture — NestJS composition

Status: **design-only example**

This directory shows what the proposed pack architecture could look like before the Dryv contracts are implemented.

## Suggested pack tree

```text
packs/
├── unit/
│   └── backend/
│       └── nestjs/
│           ├── dryv.pack.yaml
│           └── dryv.example.yaml
│
└── inject/
    ├── backend/
    │   └── nestjs/
    │       ├── dryv.pack.yaml
    │       └── dryv.example.yaml
    ├── validation/
    │   ├── zod/
    │   │   ├── dryv.pack.yaml
    │   │   └── dryv.example.yaml
    │   └── class-validator/
    │       ├── dryv.pack.yaml
    │       └── dryv.example.yaml
    └── persistence/
        └── typeorm/
            ├── dryv.pack.yaml
            └── dryv.example.yaml
```

## Responsibilities

### `unit/backend/nestjs`

Owns the runnable NestJS unit:

```text
package.json
tsconfig.json
src/main.ts
src/app.module.ts
root configuration
```

It does **not** generate feature controllers or DTOs itself.

It consumes `operation.server` and assembles the provider's feature modules into the root application module.

### `inject/backend/nestjs`

Owns reusable NestJS feature implementation:

```text
controller
service boundary
feature module
```

It consumes validation and optional persistence representations.

### `inject/validation/zod` and `inject/validation/class-validator`

Alternative TypeScript validation providers. Both expose a compatible public `schema` placement while preserving their own representation contracts and filename defaults.

### `inject/persistence/typeorm`

Owns TypeORM entity representations.

## Proposed project layouts

The same packs should support all three styles:

### Feature-oriented

```text
apps/backend/
└── src/
    └── modules/
        └── orders/
            ├── controller.ts
            ├── service.ts
            ├── module.ts
            ├── dto/
            │   └── create-order.schema.ts
            └── entities/
                └── order.entity.ts
```

### Central generated tree

```text
apps/backend/
└── src/
    ├── main.ts
    ├── app.module.ts
    └── _generated/
        ├── controllers/
        ├── services/
        ├── modules/
        ├── dto/
        └── entities/
```

### Type-oriented

```text
apps/backend/
└── src/
    ├── controllers/
    ├── services/
    ├── modules/
    ├── contracts/
    └── models/
```

See the corresponding explicit Usage examples under `usage/`.

## Important

Fields such as `target`, `placements`, `match`, `accepts`, `locality`, `contract`, aggregate imports and `dryv.example/v1alpha1` are **proposed syntax** used to make the design reviewable.

They are not current Dryv contract syntax.


## Review helpers

- [Suggested pack composition](SUGGESTED-PACKS.md) — how `dryv pack add` could turn a pack example into a reviewed explicit composition.
- [Proposed schema notes](SCHEMA-NOTES.md) — proposed syntax and the main design questions to validate.
- [Invalid examples](INVALID-EXAMPLES.md) — examples the Engine should reject.


## Destination-centered placement

The explicit Usage examples intentionally keep structural overrides under:

```text
destinations.code.backend.place
```

rather than under each pack activation.

That means one unit shows its complete generated structure together:

```text
backend
├── server.controller
├── server.service
├── server.module
├── validation.schema
└── persistence.entity
```

Pack activations simply target `backend`.

The pack manifest still owns the placement defaults; the destination only overrides them.

## Multi-option example

The NestJS unit `dryv.example.yaml` demonstrates a generic `$example` wrapper for:

- package manager;
- complete source-layout profile;
- validation provider pack;
- TypeORM naming strategy.

Resolving those choices must produce ordinary explicit Usage with no `$example` nodes remaining.
