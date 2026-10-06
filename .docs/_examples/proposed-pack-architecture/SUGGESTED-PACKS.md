# Suggested pack composition

Status: **design example aligned with current Dryv planning**

## Composition

```text
unit/backend/nestjs
  needs operation.server: required

inject/backend/nestjs
  provides operation.server
  needs schema.validation: required
  needs schema.persistence: recommended

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

## Runner alternatives

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

A setup destination may suggest:

```yaml
destinations:
  backend:
    path: apps/backend
    runner: bun
    actions:
      - $ref: "#/actions/format"
      - $ref: "#/actions/build"
```

## Materialized placement

A type-oriented persistence activation can be concise:

```yaml
packs:
  persistence:
    source:
      $ref: "#/sources/packs/official"
      path: inject/persistence/typeorm

    destination:
      $ref: "#/destinations/backend"
      root: [src]

    inputs:
      naming_strategy: snake

    outputs:
      entity:
        path: [models]
        symbol: "$(subject.name.pascal)Model"
```

Final placement composes:

```text
apps/backend
+ src
+ models
+ template output name
```

For a feature-oriented server:

```yaml
destination:
  $ref: "#/destinations/backend"
  root: [src, modules]

outputs:
  controller:
    path: ["$(feature.name.kebab)"]
  service:
    path: ["$(feature.name.kebab)"]
  module:
    path: ["$(feature.name.kebab)"]
```

No repeated `src/modules` prefix is needed.

## Materialized actions

Normal Usage stores the selected concrete commands:

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
      root: [src, models]
    inputs:
      naming_strategy: snake
    outputs:
      entity:
        path: [$(group.name.kebab)]
        symbol: "$(subject.name.pascal)Model"
```

The runner menu is setup guidance, not runtime command-selection state.

## Distinction

```text
pack contract
    legal generation facts/capabilities

example
    providers / runners / placement suggestions

materialization
    resolves runner and setup alternatives

usage
    explicit concrete project decisions
```
