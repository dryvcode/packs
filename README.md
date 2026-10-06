# Dryv packs

<p align="left">
  <a href="https://dryv.alidantech.org"><img src=".docs/badge/built-with-dryv.svg" alt="built with dryv"></a>
</p>

Official packs for [Dryv](https://dryv.alidantech.org): reusable templates that turn canonical Dryv meaning into generated code, packages, documentation, fixtures and project artifacts for real ecosystems.

> **Status:** being set up. No packs are published yet.

Packs live at `packs/<layout>/<purpose>/<name>`, for example `packs/inject/persistence/typeorm-entities`, `packs/inject/documentation/markdown-reference` and `packs/inject/testing/schema-examples` ([folder structure](.docs/folder-structure.md)). The manifest declares behavior; the folder path is for browsing and source selection.

## Official, local or private

Your project chooses its packs explicitly. Official packs from this repo, local packs in your project and private git packs can all target the same frameworks, and Dryv never prefers one over another.

## Using a pack

Declare the collection once in `dryv.yaml`, then activate the pack by path:

```yaml
version: dryv/v1alpha1

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

## Repository maintenance

The repository avoids parallel sources of truth:

- pack catalogue metadata lives only in each pack's `dryv.pack.yaml`; `catalog.json` is generated and not committed;
- every pack test uses the same `fixtures/dryv.ir.yaml`;
- reusable test inputs live under `fixtures/`;
- exact reusable template/support assets and repeated manifest policy have canonical sources under `shared/`, with synchronized copies/marked regions inside packs so released packs stay standalone;
- repository pack discovery, pack IDs and release refs come from `scripts/lib/repository.ts`.

Useful consistency checks:

```bash
bun run shared:check
bun run catalog:check
```

See [pack testing](.docs/testing.md) and [folder structure](.docs/folder-structure.md).

## License

- The repository, pack definitions, tooling and tests: [Apache License 2.0](LICENSE).
- Code-emitting template material under `packs/*/*/*/templates/`: [0BSD](LICENSE-0BSD).

Code that Dryv generates from these packs is yours, under your project's own license.

## Contributing

Active repository work is tracked in [.docs/plan.md](.docs/plan.md) and [.docs/TODO.md](.docs/TODO.md). The scheduled layout migration is in [.docs/planning/pack-layout-refactor.md](.docs/planning/pack-layout-refactor.md); simple pack identity, thin-unit composition and binding compatibility are tracked in [.docs/planning/pack-identity-and-composition.md](.docs/planning/pack-identity-and-composition.md). Superseded documents are kept only under `.docs/_archives/`.

Template naming and derived-context conventions: [.docs/template-context.md](.docs/template-context.md).
