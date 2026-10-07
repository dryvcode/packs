# Dryv packs

<p align="left">
  <a href="https://dryv.alidantech.org"><img src=".docs/badge/built-with-dryv.svg" alt="built with dryv"></a>
</p>

Official packs for [Dryv](https://dryv.alidantech.org): portable generation packs that turn Canonical Runtime IR into framework-native source code, configuration, documentation, tests and complete generated units.

> **Status:** being set up. No packs are published yet.

## Repository model

Packs live at:

```text
packs/<layout>/<purpose>/<name>
```

with the target two-layout model:

```text
inject
  contributes implementation artifacts into a unit

unit
  establishes and owns a generated unit root
```

The physical repository already uses `inject/` and `unit/`, while some manifests and identity tooling are still being reconciled from the former layout model. Track that migration in the active modernization tasks.

The repository is currently normalizing older verbose terminal names to the smallest stable technology/variant names. See [pack modernization](.docs/tasks/pack-modernization/README.md).

## Pack philosophy

Dryv's Runtime IR stays framework-neutral.

Packs are expected to be framework-native.

That means NestJS, Flutter, Spring, Next.js and other ecosystems may intentionally generate very different file/folder structures, tests and assembly patterns.

Dryv consistency means consistent contracts, not identical generated architecture.

## Official, local or private

Projects choose packs explicitly.

Official packs from this repository, local packs and private Git packs use the same contracts. Dryv does not implicitly activate a provider.

## Using a pack

A project declares a pack source and activates a pack explicitly:

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
  docs:
    path: generated/docs

authoring:
  source:
    $ref: "#/sources/authoring/ir"

packs:
  reference:
    source:
      $ref: "#/sources/packs/official"
      path: inject/documentation/markdown-reference

    destination:
      $ref: "#/destinations/docs"
```

## Repository maintenance

The repository avoids parallel sources of truth:

- catalogue metadata is derived from each `dryv.pack.yaml`;
- every pack test uses the shared `fixtures/dryv.ir.yaml`;
- reusable fixture inputs live under `fixtures/`;
- exact portable reusable assets/fragments have canonical sources under `shared/`;
- discovery, IDs and release refs are centralized in repository tooling.

Useful checks:

```bash
bun run shared:check
bun run catalog:check
bun run test:packs
```

See [pack testing](.docs/testing.md), [folder structure](.docs/folder-structure.md), and [the active repository plan](.docs/plan.md).

## Current work

Current execution is intentionally narrow:

1. finish repository pack identity/name normalization;
2. then make `inject/backend/nestjs` and `unit/backend/nestjs` the first reference-quality framework pair;
3. prove their output using the native NestJS/TypeScript toolchain;
4. only then begin another framework-quality pass.

Track this work in [.docs/tasks/pack-modernization/](.docs/tasks/pack-modernization/README.md).

## License

- Repository, pack definitions, tooling and tests: [Apache License 2.0](LICENSE).
- Code-emitting template material under `packs/*/*/*/templates/`: [0BSD](LICENSE-0BSD).

Generated code belongs to the consuming project under that project's chosen license.
