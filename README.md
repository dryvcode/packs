# Dryv packs

[![built with dryv](https://dryv.alidantech.org/badge/built-with-dryv.svg)](https://dryv.alidantech.org)

Official packs for [Dryv](https://dryv.alidantech.org): reusable templates that turn your Dryv project's meaning into real code for well-known packages and frameworks such as TypeORM, NestJS and zod.

> **Status:** being set up. No packs are published yet.

Packs live at `packs/<layout>/<purpose>/<name>`, for example `packs/inject/persistence/typeorm-entities` ([folder structure](.docs/folder-structure.md)). The manifest declares behavior; the folder path is for browsing and source selection.

## Official, local or private

Your project chooses its packs explicitly. Official packs from this repo, local packs in your project and private git packs can all target the same frameworks, and Dryv never prefers one over another.

## Using a pack

Declare the collection once in `dryv.yaml`, then activate the pack by path:

```yaml
version: dryv.usage/v1alpha1

sources:
  authoring:
    ir: { type: ir, path: dryv.ir.yaml }
  packs:
    official:
      repository: https://github.com/dryvcode/packs
      ref: develop
      root: packs
destinations:
  code:
    backend: { path: src/modules }
authoring:
  source: { $ref: "#/sources/authoring/ir" }
packs:
  entities:
    source: { $ref: "#/sources/packs/official" }
    path: inject/persistence/typeorm-entities
    destination: { $ref: "#/destinations/code/backend" }
```

## License

- The repository, pack definitions, tooling and tests: [Apache License 2.0](LICENSE).
- Code-emitting template material under `packs/*/*/*/templates/`: [0BSD](LICENSE-0BSD).

Code that Dryv generates from these packs is yours, under your project's own license.

## Contributing

The design decisions are in [.docs/pack-design-decisions.md](.docs/pack-design-decisions.md) and the plan in [.docs/plan.md](.docs/plan.md).

Template naming and derived-context conventions: [.docs/template-context.md](.docs/template-context.md).
