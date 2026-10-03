# Dryv packs

[![built with dryv](https://dryv.alidantech.org/badge/built-with-dryv.svg)](https://dryv.alidantech.org)

Global packs for [Dryv](https://dryv.alidantech.org): reusable templates that turn your Dryv project's meaning into real code for well-known packages and frameworks such as TypeORM, NestJS and zod.

> **Status:** being set up. No packs are published yet.

Packs live at `packs/<language>/<template-language>/<name>`, for example `packs/typescript/jinja/typeorm-entities` ([folder structure](.docs/folder-structure.md)).

## Global or local?

- **Global packs (this repo):** use these for any well-known package or framework, instead of writing your own.
- **Local packs (your project's `dryv/packs/`):** only for designs your project invented.

## Using a pack

Each pack is released on its own, with a tag made of its path and version, such as `typescript/jinja/typeorm-entities/v0.1.0`. Reference it from your project's `dryv.yaml`, pinned to that tag:

```yaml
packs:
  entities:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: typescript/jinja/typeorm-entities/v0.1.0
      path: packs/typescript/jinja/typeorm-entities
```

## Contributing

The plan and the design decisions are in [.docs/](.docs/plan.md).

## License

GNU General Public License v3.0. See [LICENSE](LICENSE).
