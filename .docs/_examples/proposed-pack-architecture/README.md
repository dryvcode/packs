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
    │   └── zod/
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

### `inject/validation/zod`

Owns Zod validation schemas.

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
