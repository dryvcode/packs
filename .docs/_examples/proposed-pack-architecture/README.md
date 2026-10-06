# Proposed pack architecture — NestJS composition

Status: **design-only example**

This directory shows the latest proposed architecture before Dryv contracts are implemented.

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

Each pack example contains a minimal proposed `dryv.pack.yaml` and an optional compact `dryv.example.yaml`.

## Core idea

```text
dryv.pack.yaml
    keeps rigid generation facts

template filesystem + output
    define zero-config default output

dryv.example.yaml
    suggests useful setup choices

dryv.yaml destination.outputs
    records actual project output overrides

dryv.yaml destination.imports
    records actual import-root/prefix policy
```

There is no proposed pack-side `placements:` registry.

## Pack default output

Example pack output:

```yaml
templates:
  entity:
    $ref: "#/selections/entities"
    output:
      name: $(subject.name.kebab)
      path:
        - $(group.name.kebab)
        - entities
      symbol: $(subject.name.pascal)Entity
```

The first path segment is semantic/dynamic; later segments may be static pack-local structure.

If Usage says nothing, the pack filesystem and this output win.

## Project override

A project may partially override the same output:

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      outputs:
        persistence:
          entity:
            path: [src, models]
            symbol: "$(subject.name.pascal)Model"
```

`persistence` is the activation name; `entity` is the template key.

## Compact example options

Examples deliberately prefer terse choices:

```yaml
choose:
  js.package_manager: [bun, pnpm, npm, yarn]

inputs:
  naming_strategy: [snake, camel]
```

Structured alternatives use direct values rather than `value:` wrappers.

## Explicit Usage examples

Compare:

- `usage/dryv.feature-oriented.yaml` — relative imports;
- `usage/dryv.central-generated.yaml` — `#/` rooted imports;
- `usage/dryv.type-oriented.yaml` — `@/` rooted imports plus symbol overrides.

## Import addressing

See [IMPORT-ADDRESSING.md](IMPORT-ADDRESSING.md) for:

- relative imports;
- TypeScript `@/` and `#/`;
- Python dotted modules;
- Java package imports;
- Dart `package:` imports.

## Review helpers

- [SUGGESTED-PACKS.md](SUGGESTED-PACKS.md) — setup experience;
- [SCHEMA-NOTES.md](SCHEMA-NOTES.md) — proposed syntax and open decisions;
- [INVALID-EXAMPLES.md](INVALID-EXAMPLES.md) — expected planning failures.

All fields beyond current Dryv contracts are design-only and intentionally easy to change while planning.
