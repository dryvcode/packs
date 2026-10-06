# Proposed pack architecture — NestJS composition

Status: **review example aligned with the latest Dryv design**

This directory is the review surface for the pack/Usage architecture.

The key rule is now:

```text
dryv.example.yaml
    = ordinary dryv.yaml shape
    + optional ordered $options metadata
```

No second setup DSL is introduced.

## Core model

```text
dryv.pack.yaml
    generation contract
    info / inputs / needs / selections / templates
    provides / dependencies

dryv.example.yaml
    same structure as dryv.yaml
    plus sibling $options metadata

dryv.yaml destination
    generated/build-unit root
    selected action refs

dryv.yaml pack activation
    source/path
    destination.$ref
    destination.root
    bindings
    inputs
    outputs.<real-template-key>

dryv.yaml actions
    concrete commands
```

## Keyed needs preserve real refs

```yaml
needs:
  schema.validation: required
  schema.persistence: recommended
```

This makes these real semantic targets:

```yaml
imports:
  - $ref: "#/needs/schema.validation"
  - $ref: "#/needs/schema.persistence"
```

Allowed strengths are:

```text
required
recommended
optional
```

## Three placement layers

```text
destination.path
+ pack activation destination.root
+ final template/output.path
```

Example:

```yaml
destinations:
  backend:
    path: apps/backend

packs:
  server:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    outputs:
      controller:
        path: [modules, "$(feature.name.kebab)"]
```

## Generic $options

A hard-coded normal value is the default:

```yaml
inputs:
  naming_strategy: snake

  $options:
    naming_strategy:
      - camel
```

Effective choices:

```text
0 -> snake
1 -> camel
```

If the normal field is absent, the first listed value is the default:

```yaml
inputs:
  $options:
    naming_strategy:
      - snake
      - camel
```

There are no option IDs and no `default:` entry.

## Object alternatives

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

Each listed item is one complete valid value for the normal `outputs` field.

## Array alternatives

If the target field itself is an array, every option is a complete array.

```yaml
actions:
  format:
    stage: files
    commands:
      - run: [bun, x, prettier, --write, $(files)]

    $options:
      commands:
        -
          - run: [pnpm, dlx, prettier, --write, $(files)]

        -
          - run: [npm, exec, --, prettier, --write, $(files)]
```

## No special runner schema

Examples do not add:

```text
runner:
runners:
profile:
default:
named option IDs
```

Different command/dependency strategies are alternatives for the ordinary action fields or the complete action definition.

## Review fixtures

- `packs/project/backend/nestjs/dryv.example.yaml` — composed example.
- `packs/inject/backend/nestjs/dryv.example.yaml` — server-only example.
- `packs/inject/validation/*/dryv.example.yaml` — validation alternatives.
- `packs/inject/persistence/typeorm/dryv.example.yaml` — inputs and output alternatives.
- `usage/*.yaml` — fully materialized ordinary Usage with no `$options`.

Also review:

- [SCHEMA-NOTES.md](SCHEMA-NOTES.md)
- [SUGGESTED-PACKS.md](SUGGESTED-PACKS.md)
- [IMPORT-ADDRESSING.md](IMPORT-ADDRESSING.md)
- [INVALID-EXAMPLES.md](INVALID-EXAMPLES.md)


## Remaining review gaps

The example architecture now exposes two pre-existing Engine gaps clearly:

1. The NestJS composition uses `operation.server` as the capability between the project pack and the injected server pack, but the current Engine slot catalogue does not yet include `operation.server`.
2. The import-addressing review examples use destination `imports` configuration, but the current Engine `CodeDestination` contract does not yet expose that field.

These are separate from the `$options` refactor. They should be resolved explicitly rather than hidden with example-only syntax.
