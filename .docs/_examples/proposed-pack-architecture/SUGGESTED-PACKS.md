# Suggested pack composition

Status: **design-only**

This shows how the compact `dryv.example.yaml` can guide setup without bloating `dryv.pack.yaml`.

## User adds the NestJS unit

```text
dryv pack add unit/backend/nestjs
```

The pack contracts determine what is legal:

```text
unit/backend/nestjs
  needs operation.server

inject/backend/nestjs
  provides operation.server
  needs schema.validation
  optionally needs schema.persistence

inject/validation/zod
  provides schema.validation

inject/validation/class-validator
  provides schema.validation

inject/persistence/typeorm
  provides schema.persistence
```

The example supplies useful choices.

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

Package manager
  ● Bun
  ○ pnpm
  ○ npm
  ○ Yarn

TypeORM naming
  ● snake
  ○ camel
```

This comes from compact example values such as:

```yaml
choose:
  js.package_manager: [bun, pnpm, npm, yarn]

packs:
  validation:
    pack:
      - inject/validation/zod
      - inject/validation/class-validator

inputs:
  naming_strategy: [snake, camel]
```

Structured choices such as source layout remain named maps because they contain several coordinated output overrides.

## Materialized result

After setup, normal `dryv.yaml` contains only the selected values:

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      choose:
        js.package_manager: bun
      imports:
        root: src
        prefix: "@/"
      outputs:
        persistence:
          entity:
            path: [src, models]
            symbol: "$(subject.name.pascal)Model"
```

No example-only option lists remain.

## Important distinction

```text
pack contract
    legal capabilities and inputs

example
    recommended setup choices

catalogue
    may discover more legal alternatives

usage
    actual explicit project decision
```

Repeated readable options across pack examples are acceptable.
