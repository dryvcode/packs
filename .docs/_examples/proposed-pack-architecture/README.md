# Proposed pack architecture — NestJS composition

Status: **design example aligned with current Dryv planning**

This directory demonstrates the latest Dryv pack/Usage model, including the open runner-materialization hardening from Dryv roadmap task 16.

## Suggested pack tree

```text
packs/
├── unit/
│   └── backend/
│       └── nestjs/
│           ├── dryv.pack.yaml
│           └── dryv.example.yaml
└── inject/
    ├── backend/nestjs/
    ├── validation/zod/
    ├── validation/class-validator/
    └── persistence/typeorm/
```

## Core model

```text
dryv.pack.yaml
    generation contract
    info / inputs / needs / selections / templates
    provides / dependencies

pack template output
    zero-config output default

dryv.example.yaml
    setup alternatives
    runner alternatives
    provider/input/output suggestions

dryv.yaml destination
    generated/build-unit root
    import addressing
    selected action refs

dryv.yaml pack activation
    source/path
    destination
    bindings
    inputs
    outputs.<real-template-key>

dryv.yaml actions
    concrete commands selected during setup
```

There is no pack-side `placements:` registry and no capability-keyed destination output map.

## Pack metadata

Discovery/compatibility metadata lives under `info`:

```yaml
info:
  title: Zod
  version: 0.1.0
  purpose: validation
  summary: Zod validation schemas.
  languages: [typescript]
  frameworks: [zod]
  tags: [validation, schema]
```

Do not duplicate this with `catalog:` or `target:`.

## Needs

Required is the common default:

```yaml
needs:
  - operation.server
```

When strengths differ:

```yaml
needs:
  required:
    - schema.validation
  recommended:
    - schema.persistence
```

Provider compatibility is Engine-owned; consumers do not list known provider packs.

## Pack default output

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

If Usage says nothing, pack filesystem + template output wins.

## Project output override

Output customization belongs to the concrete pack activation:

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
        path: [$(group.name.kebab)]
        symbol: "$(subject.name.pascal)Model"
```

`entity` is a real template key.

The override is a partial version of the existing template output object:

```text
path
name
symbol
symbols
```

## Flat destinations

```yaml
destinations:
  backend:
    path: apps/backend
```

There is no `destinations.code.backend` nesting.

## Actions and runners

Root actions are flat and carry their stage:

```yaml
actions:
  format:
    stage: files
    extensions: [.ts]
    commands:
      - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

Destinations select them using real refs:

```yaml
destinations:
  backend:
    path: apps/backend
    actions:
      - $ref: "#/actions/format"
```

In `dryv.example.yaml`, compact command alternatives may represent supported runners:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier@3.9.9, --write, $(files)]
  - run: [npm, exec, --yes, --package, prettier@3.9.9, --, prettier, --write, $(files)]
  - run: [bun, x, prettier@3.9.9, --write, $(files)]
```

`(pnpm|yarn)` means those runners share that behavior.

Materialized `dryv.yaml` keeps only the selected concrete command.

## Explicit Usage examples

Compare:

- `usage/dryv.feature-oriented.yaml` — relative imports;
- `usage/dryv.central-generated.yaml` — `#/` rooted imports;
- `usage/dryv.type-oriented.yaml` — `@/` rooted imports plus symbol overrides.

These files show **materialized Usage**, so their actions are concrete rather than runner-option matrices.

## More notes

- [IMPORT-ADDRESSING.md](IMPORT-ADDRESSING.md)
- [SUGGESTED-PACKS.md](SUGGESTED-PACKS.md)
- [SCHEMA-NOTES.md](SCHEMA-NOTES.md)
- [INVALID-EXAMPLES.md](INVALID-EXAMPLES.md)
