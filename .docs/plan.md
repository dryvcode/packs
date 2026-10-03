# Packs repository plan

Status: **final, ready to build** (2026-10-03).

[pack-design-decisions.md](pack-design-decisions.md) is the authority. If this plan and that document ever disagree, that document wins, and the conflict is raised with the owner.

## Decisions

| Topic | Decision |
| --- | --- |
| Repository | `dryvcode/packs`, public. Work on `develop`; CI runs for `main` only. |
| Folder structure | `packs/<purpose>/<pack-name>`. Folders carry no runtime meaning. |
| First purposes | `persistence`, `validation`, `backend`, `clients`, `frontend`. A new purpose is added only when a real pack needs it. |
| Licenses | `LICENSE` (Apache-2.0) covers the repo, pack definitions, tooling and tests. `LICENSE-0BSD` covers code-emitting template material under `packs/*/*/templates/`. Generated code is under the consuming project's license. |
| Tags | `<purpose>/<pack-name>/v<version>`, starting at `0.1.0`, e.g. `persistence/typeorm-entities/v0.1.0` |
| Catalogue metadata | An optional `catalog` block in `dryv.pack.yaml` (`purpose`, `summary`, `languages`, `frameworks`, `tags`), added to Dryv's pack contract. The engine accepts it and ignores it at runtime. |
| Catalogue | Generated in CI from every pack's `catalog` block and published with releases. Not committed. Discovery only. |
| Composition | Explicit `provides`, `needs` and project bindings only |
| Collisions | One output path, one owner. Collisions fail planning. |
| Reproducibility | A readable tag in `dryv.yaml`, resolved by the client to a commit SHA and content digest stored in `dryv.lock.yaml` (the existing Dryv lock schema) |
| Source type | No `source: { type: dryv }`. Projects use explicit `git` sources; `dryv packs add` will write them. |
| Starter packs | **Copied** from the Dryv repo's `_examples/packs`. Dryv keeps its own copies for its examples and tests. |
| Fixture testing | Every pack has a fixture rendered through the Dryv CLI and checked with its real toolchain. CI runs the engine image (`ghcr.io/dryvcode/dryv-engine`, pinned tag) as a service container. |
| Generated-file ownership | Managed (Dryv owns it) and scaffold (created once, then owned by the project). Scaffold mode is built in Dryv **after** the first packs. Line-level ownership is not an approved design. |

## Pack layout

```text
packs/
├── persistence/
│   ├── typeorm-entities/        starter
│   └── mongoose-models/         new
├── validation/
│   ├── class-validator-dtos/    starter
│   ├── zod-schemas/             starter
│   └── joi-schemas/             starter
├── backend/
│   ├── nestjs-backend/          starter
│   └── fastapi-backend/         starter
├── clients/
│   └── dart-client-sdk/         starter
└── frontend/
    └── nextjs-app/              new
```

Each pack folder:

```text
<pack-name>/
├── dryv.pack.yaml               includes the catalog block
├── README.md                    what it emits, slots it provides and needs, an example dryv.yaml entry
├── CHANGELOG.md
├── templates/                   0BSD
└── tests/fixture/               dryv.yaml, IR, toolchain project, tests
```

Repository files:

```text
README.md  LICENSE  LICENSE-0BSD
.docs/                           decisions, plan, folder structure
scripts/test-pack.ts             fixture harness, adapted from the Dryv repo
scripts/catalog.ts               catalogue generator
.github/workflows/               test every pack on PRs to main; release a pack from its tag
```

## Build order

Each step ends with every fixture passing.

1. **Dryv: `catalog` block.** Add the optional `catalog` field to the pack contract in the engine and to `dryv.pack.schema.json`, with tests.
2. **Repository scaffolding:** licenses, README, `scripts/test-pack.ts` adapted to `packs/<purpose>/<name>`, and the CI workflow with the engine service container.
3. **Starter packs:** copy the seven into their purpose folders, add `catalog` blocks, READMEs and changelogs, and make every fixture pass.
4. **Catalogue generator** and the release workflow (per-pack tags, GitHub Release, published catalogue).
5. **New pack:** `persistence/mongoose-models`.
6. **New pack:** `frontend/nextjs-app`.
7. **First releases:** tag every pack at `v0.1.0`.
8. **alidantech-api:** use the released packs from git sources pinned to their tags.
9. **Dryv: lock state.** The client resolves each tag to a commit SHA and digest and writes `dryv.lock.yaml`.
10. **Dryv: scaffold mode**, designed and built (Dryv roadmap: generated file ownership).
11. **Dryv: `dryv packs search` / `dryv packs add`**, reading the published catalogue.

## Open questions

1. The example in `pack-design-decisions.md` §1 writes `provides` as a list (`- schema.persistence`). Dryv's contract makes it a map from slot to template (`schema.persistence: { $ref: '#/templates/entity' }`). Should the example be corrected? The document is locked.
2. The designs of `mongoose-models` and `nextjs-app`: what they emit, and which slots they provide and need. To be decided before steps 5 and 6.
