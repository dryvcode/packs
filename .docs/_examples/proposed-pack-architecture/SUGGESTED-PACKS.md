# Suggested pack composition

Status: **review example aligned with current Dryv planning**

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

## Setup choices come from ordinary fields

A UI may still present friendly choices:

```text
Validation
  ● Zod
  ○ class-validator

Layout
  ● feature-oriented
  ○ generated
  ○ type-oriented

Formatting/install/build commands
  ● Bun commands
  ○ pnpm commands
  ○ npm commands
  ○ Yarn commands

TypeORM naming
  ● snake
  ○ camel
```

But the file does not store those labels or IDs.

It stores normal values plus ordered alternatives.

## Provider example

```yaml
packs:
  validation:
    source:
      $ref: "#/sources/packs/official"
      path: inject/validation/zod

    $options:
      source:
        - $ref: "#/sources/packs/official"
          path: inject/validation/class-validator
```

Zod is the default because it is the normal hard-coded value.

## Scalar example

```yaml
inputs:
  naming_strategy: snake

  $options:
    naming_strategy:
      - camel
```

## Layout example

```yaml
outputs:
  entity:
    path: [models]
    symbol: "$(subject.name.pascal)Model"

$options:
  outputs:
    - entity:
        path: [modules, "$(group.name.kebab)", entities]

    - entity:
        path: [_generated, entities]
```

No profile names are required.

## Action example

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [bun, x, prettier@3.9.9, --write, $(files)]

  $options:
    format:
      - stage: files
        extensions: [.ts]
        commands:
          - run: [pnpm, dlx, prettier@3.9.9, --write, $(files)]

      - stage: files
        extensions: [.ts]
        commands:
          - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
```

Each alternative is a complete normal `ActionDefinition`.

## Materialized result

Once choices are selected, normal Usage contains only concrete values:

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [pnpm, dlx, prettier@3.9.9, --write, $(files)]

packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    inputs:
      naming_strategy: camel

    outputs:
      entity:
        path: [models]
        symbol: "$(subject.name.pascal)Model"
```

There is no `$options` metadata in materialized Usage.
