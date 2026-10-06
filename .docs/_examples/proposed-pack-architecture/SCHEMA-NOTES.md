# Proposed syntax review notes

Status: **aligned with the latest Dryv design decisions**

## Pack manifest

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

Do not duplicate implementation metadata under `catalog:` or `target:`.

## Needs are keyed because they are referenced

Canonical direction:

```yaml
needs:
  schema.validation: required
  schema.persistence: recommended
  property.enum.types: optional
```

Allowed strengths:

```text
required
recommended
optional
```

The keyed map preserves stable refs:

```yaml
imports:
  - $ref: "#/needs/schema.validation"
```

Do not use arrays or grouped lists for `needs`; they make semantic refs positional or false.

Compatibility remains Engine-owned. Consumers do not enumerate provider allowlists.

## Provides

```yaml
provides:
  schema.persistence:
    $ref: "#/templates/entity"
```

Every ref must resolve to a real template node.

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

Pack defaults remain portable and semantic/local.

## Flat destination map

```yaml
destinations:
  backend:
    path: apps/backend
```

Refs use:

```text
#/destinations/backend
```

## Activation destination root

A pack activation may add a project-specific root inside the destination:

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src, models]
```

Meaning:

```text
destination.path
+ activation destination.root
+ final template/output.path
```

The root is optional.

Without it, output behavior remains unchanged.

Do not place this pack-specific root on the global destination.

## Output overrides

Output overrides remain on the activation and remain keyed by real template key:

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    outputs:
      entity:
        path: [models, "$(group.name.kebab)"]
        symbol: "$(subject.name.pascal)Model"
```

The override vocabulary remains:

```text
name
path
symbol
symbols
```

An explicit output `path` replaces the pack template path, then activation `root` is prepended.

## Final path planning

Required conceptual order:

```text
pack template output default
    ↓
activation outputs.<template-key> partial override
    ↓
final template-relative path/name/symbol(s)
    ↓
prepend activation destination.root
    ↓
prepend destination.path
    ↓
collision / representation / dependency planning
    ↓
import addressing
```

Import planning must never use pre-root/pre-override paths.

## Flat actions

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

Destinations select real refs:

```yaml
actions:
  - $ref: "#/actions/format"
  - $ref: "#/actions/build"
```

## Compact runner alternatives

In `dryv.example.yaml`:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier@3.9.9, --write, $(files)]
  - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
  - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

The same grouped runner syntax applies to dependency args:

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

Materialized Usage contains concrete commands and concrete dependency argument rules.

Do not use `choose.js.package_manager` merely to choose command variants.

## Import addressing

Import configuration stays destination-wide:

```yaml
destinations:
  backend:
    path: apps/backend
    imports:
      root: src
      prefix: "@/"
```

Activation root and output overrides resolve before import addressing.

## Real-reference rule

Anything intentionally addressed by semantic `$ref` must expose a stable keyed node.

Examples:

```text
#/needs/schema.validation
#/templates/entity
#/actions/format
#/destinations/backend
#/packs/persistence
```

Avoid positional array refs for semantic identities.

## Review focus

The examples should now make it possible to review these boundaries independently:

```text
unit root        -> destination.path
pack root        -> activation destination.root
template path    -> output.path
workflow choice  -> example runner materialization
runtime action   -> concrete Usage command
capability need  -> keyed needs map
```
