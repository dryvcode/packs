# Suggested pack composition

Status: **design example aligned with current Dryv planning**

## User adds the NestJS unit

```text
dryv pack add unit/backend/nestjs
```

Composition:

```text
unit/backend/nestjs
  needs operation.server

inject/backend/nestjs
  provides operation.server
  requires schema.validation
  recommends schema.persistence

inject/validation/zod
  provides schema.validation

inject/validation/class-validator
  provides schema.validation

inject/persistence/typeorm
  provides schema.persistence
```

## Possible setup UI

```text
NestJS backend

Validation
  ● Zod
  ○ class-validator

Source layout
  ● Pack default
  ○ Feature modules
  ○ Central _generated
  ○ Type-oriented

Imports
  ● Relative
  ○ @/ from src
  ○ #/ from src

Runner
  ● Bun
  ○ pnpm
  ○ npm
  ○ Yarn

TypeORM naming
  ● snake
  ○ camel
```

The runner replaces package-manager choices whose only purpose was selecting action command variants.

## Example action alternatives

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [(pnpm|yarn), dlx, prettier@3.9.9, --write, $(files)]
      - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
      - run: [bun, x, prettier@3.9.9, --write, $(files)]

  build:
    stage: final
    commands:
      - run: [(pnpm|bun|yarn), run, build]
      - run: [npm, run, build]
```

A destination may suggest:

```yaml
destinations:
  backend:
    path: apps/backend
    runner: bun
    actions:
      - $ref: "#/actions/format"
      - $ref: "#/actions/build"
```

## Materialized result

After setup, normal Usage contains the selected concrete commands:

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [bun, x, prettier@3.9.9, --write, $(files)]

  build:
    stage: final
    commands:
      - run: [bun, run, build]

destinations:
  backend:
    path: apps/backend
    imports:
      root: src
      prefix: "@/"
    actions:
      - $ref: "#/actions/format"
      - $ref: "#/actions/build"

packs:
  persistence:
    source:
      $ref: "#/sources/packs/official"
      path: inject/persistence/typeorm
    destination:
      $ref: "#/destinations/backend"
    inputs:
      naming_strategy: snake
    outputs:
      entity:
        path: [src, models]
        symbol: "$(subject.name.pascal)Model"
```

The runner menu has disappeared. The result stores actual project decisions.

## Important distinction

```text
pack contract
    generation facts and capabilities

example
    recommended providers / runners / output choices

materialization
    resolves runner alternatives and setup choices

usage
    explicit concrete project decisions
```
