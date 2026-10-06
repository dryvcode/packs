# Proposed syntax review notes

Status: **aligned with the latest Dryv pack/Usage design**

## Pack manifest stays small

```yaml
layout: unit | inject

info:
  title: TypeORM
  version: 0.1.0
  purpose: persistence
  summary: TypeORM entities.
  languages: [typescript]
  frameworks: [typeorm]
  tags: [persistence, orm, entity]

inputs: ...
needs: ...
selections: ...
templates: ...
provides: ...
dependencies: ...
```

Do not add duplicate `catalog:` or `target:` metadata.

## Needs

Common required-only case:

```yaml
needs:
  - operation.server
```

Mixed strengths:

```yaml
needs:
  required:
    - schema.validation
  recommended:
    - schema.persistence
  optional:
    - property.enum.types
```

Required must be bound. Recommended and optional may remain unbound, with recommended surfaced more strongly by setup tooling.

Compatibility rules belong to Dryv's capability model, not consumer-side `accepts` lists.

## Provides

Keep real template refs:

```yaml
provides:
  schema.persistence:
    $ref: "#/templates/entity"
```

One capability has one public provider template per activation.

## Pack output defaults

There is no `placements:` registry and no `output.placement`.

```yaml
templates:
  entity:
    $ref: "#/selections/entities"
    output:
      name: "$(subject.name.kebab)"
      path:
        - "$(group.name.kebab)"
        - entities
      symbol: "$(subject.name.pascal)Entity"
```

Reusable pack defaults remain semantic/local. Project-root folders belong to Usage.

## Flat destination map

```yaml
destinations:
  backend:
    path: apps/backend
```

Pack refs therefore use:

```yaml
destination:
  $ref: "#/destinations/backend"
```

not `#/destinations/code/backend`.

## Pack activation output overrides

Output overrides live beside the activation that owns the template:

```yaml
packs:
  persistence:
    source:
      $ref: "#/sources/packs/official"
      path: inject/persistence/typeorm

    destination:
      $ref: "#/destinations/backend"
      root: [src, models]

    outputs:
      entity:
        path: ["$(group.name.kebab)"]
        name: "$(subject.name.kebab)"
        symbol: "$(subject.name.pascal)Model"
```

`entity` must be a real template key.

The override is partial and uses the existing output vocabulary:

```text
name
path
symbol
symbols
```

Bindings and outputs solve different problems:

```text
bind
    which provider activation satisfies a capability

outputs
    how this activation's real template is placed/named
```

## Flat actions

Actions are keyed once and carry their stage:

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
```

Destination action selection uses real refs:

```yaml
actions:
  - $ref: "#/actions/format"
  - $ref: "#/actions/build"
```

## Example runners

`dryv.example.yaml` may contain compact runner alternatives:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier@3.9.9, --write, $(files)]
  - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
  - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

Grouped selectors such as `(pnpm|yarn)` mean identical behavior for those runners.

The same grouping can be used for runner-specific dependency argument rules:

```yaml
dependencies:
  args:
    - dev:
        (pnpm|yarn): [-D]
        bun: [--dev]
        npm: [--save-dev]

    - (bun|pnpm|yarn|npm):
        pinned: "$(name)@$(version)"
        any: "$(name)"
```

An example destination may provide the setup default:

```yaml
destinations:
  backend:
    path: apps/backend
    runner: bun
```

A selected action may override it when required.

Runner choices are materialization input. Normal Usage should contain the resolved commands, not the alternative matrix.

## Multiple commands

In an example, command matching chooses the commands for the selected runner.

In materialized Usage, multiple commands are genuine sequential commands.

## Environment choices

Do not use `choose.js.package_manager` merely to decide which action command variant to run.

Use runner materialization for that.

The general `choose` mechanism may still exist for genuine non-runner project choices.

## Import addressing

Import configuration remains destination-wide:

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src
      prefix: "@/"
```

Final output overrides resolve first. Import addressing uses the final producer path and symbols.

## Real refs

Every `$ref` in an example must resolve to a real node in that exact document.

Do not add a `usage:` wrapper around a Usage-shaped example while continuing to use root refs such as `#/destinations/backend`.

## Still open / hardening

Dryv roadmap task 16 owns the exact runner-materialization contract and validation.

Do not use this directory to invent another runner schema.
