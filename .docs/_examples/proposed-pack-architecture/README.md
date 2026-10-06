# Proposed pack architecture — NestJS composition

Status: **design example aligned with the latest Dryv decisions**

This directory is the review surface for the latest pack/Usage architecture.

It includes:

- keyed, addressable `needs`;
- `info`-owned language/framework metadata;
- flat destinations and flat actions;
- real refs only;
- activation-owned template output overrides;
- activation `destination.root` for shared placement prefixes;
- compact runner alternatives in `dryv.example.yaml`;
- concrete commands in materialized `dryv.yaml`;
- final-output-aware import addressing.

## Core model

```text
dryv.pack.yaml
    generation contract
    info / inputs / needs / selections / templates
    provides / dependencies

dryv.example.yaml
    setup alternatives
    provider/input/output suggestions
    compact runner alternatives

dryv.yaml destination
    generated/build-unit root
    import addressing
    selected action refs

dryv.yaml pack activation
    source/path
    destination.$ref
    destination.root
    bindings
    inputs
    outputs.<real-template-key>

dryv.yaml actions
    concrete commands selected during setup
```

There is no pack-side `placements:` registry and no capability-keyed destination output map.

## Keyed needs preserve real refs

Needs are a semantic map because templates import them by stable refs:

```yaml
needs:
  schema.validation: required
  schema.persistence: recommended
```

This makes these real JSON Pointer targets:

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

The final output path is composed from three distinct layers:

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
      root: [src, modules]

    outputs:
      controller:
        path: ["$(feature.name.kebab)"]
```

Conceptually:

```text
apps/backend
+ src/modules
+ <feature>
```

The destination owns the generated/build-unit root.

The activation root owns this pack activation's placement inside that unit.

The template/output path owns template-specific structure.

## Why activation root exists

Without it:

```yaml
outputs:
  controller:
    path: [src, modules, "$(feature.name.kebab)"]
  service:
    path: [src, modules, "$(feature.name.kebab)"]
  module:
    path: [src, modules, "$(feature.name.kebab)"]
```

With it:

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

The root is activation-specific rather than destination-wide because several packs can share one unit while using different internal roots.

## Pack default output remains portable

Pack manifests still define zero-config semantic/local defaults:

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

Project conventions such as `src/models` belong to Usage/example configuration.

## Output overrides remain template-keyed

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    outputs:
      entity:
        path: [models]
        symbol: "$(subject.name.pascal)Model"
```

`entity` is the real template key.

## Flat destinations

```yaml
destinations:
  backend:
    path: apps/backend
```

There is no `destinations.code.backend`.

## Flat actions and runner materialization

Root actions carry their stage:

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

Examples may compactly describe runner alternatives:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier@3.9.9, --write, $(files)]
  - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
  - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

`(pnpm|yarn)` means those runners share the same behavior.

Materialized Usage contains only the selected concrete command(s).

## Review fixtures

Compare:

- `usage/dryv.feature-oriented.yaml` — activation root `[src, modules]`;
- `usage/dryv.central-generated.yaml` — activation root `[src, _generated]`;
- `usage/dryv.type-oriented.yaml` — activation root `[src]` plus type-specific output folders.

Also review:

- [SCHEMA-NOTES.md](SCHEMA-NOTES.md)
- [SUGGESTED-PACKS.md](SUGGESTED-PACKS.md)
- [IMPORT-ADDRESSING.md](IMPORT-ADDRESSING.md)
- [INVALID-EXAMPLES.md](INVALID-EXAMPLES.md)
