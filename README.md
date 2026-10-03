# Dryv packs

[![built with dryv](https://dryv.alidantech.org/badge/built-with-dryv.svg)](https://dryv.alidantech.org)

Official packs for [Dryv](https://dryv.alidantech.org): reusable templates that turn your Dryv project's meaning into real code for well-known packages and frameworks such as TypeORM, NestJS and zod.

> **Status:** being set up. No packs are published yet.

Packs live at `packs/<purpose>/<pack-name>`, for example `packs/persistence/typeorm-entities` ([folder structure](.docs/folder-structure.md)). Folders are for browsing only. What a pack does is declared in its `dryv.pack.yaml`.

## Official, local or private

Your project chooses its packs explicitly. Official packs from this repo, local packs in your project and private git packs can all target the same frameworks, and Dryv never prefers one over another.

## Using a pack

Each pack is released on its own, with a tag made of its path and version. Reference it from your project's `dryv.yaml`:

```yaml
packs:
  entities:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: persistence/typeorm-entities/v0.1.0
      path: packs/persistence/typeorm-entities
```

## License

- The repository, pack definitions, tooling and tests: [Apache License 2.0](LICENSE).
- Code-emitting template material under `packs/*/*/templates/`: [0BSD](LICENSE-0BSD).

Code that Dryv generates from these packs is yours, under your project's own license.

## Contributing

The design decisions are in [.docs/pack-design-decisions.md](.docs/pack-design-decisions.md) and the plan in [.docs/plan.md](.docs/plan.md).
