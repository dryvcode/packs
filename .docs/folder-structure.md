# Folder structure

Status: **current implementation, pending scheduled layout refactor**

Public packs are currently organized as `packs/<layout>/<purpose>/<name>`.

The scheduled migration will converge `package` and `project` into `unit`. See [pack layout refactor](planning/pack-layout-refactor.md). This page describes the repository **as it exists before that migration**, not the long-term layout model.

| Layout | Role | Examples |
| --- | --- | --- |
| `inject` | Contributes files to a destination owned by the project or another pack | TypeORM entities, Markdown reference docs, schema-example fixtures |
| `package` | Owns a generated package with a declared package name and optional import root | Dart, Go and TypeScript clients, FastAPI package |
| `project` | Owns a generated application | Flutter, React Native and Next.js apps |

Purposes describe what a pack emits and are proven by real packs, not by a fixed language taxonomy. Current examples include `backend`, `clients`, `frontend`, `persistence`, `validation`, `documentation`, and `testing`.

The scalar `layout` in the current `dryv.pack.yaml` contract is authoritative; `inject` is the default. A current `package` pack declares `package.name` as a reference to an input. These are transitional implementation facts. The target contract is `inject | unit`, with package identity independent of layout. The folder hierarchy does not supply Runtime IR meaning. Language and framework tags belong in `catalog` metadata, never in Engine context.

## Repository support folders

```text
fixtures/
  dryv.ir.yaml              one Runtime IR fixture for every pack test
  manifest.json             reusable fixture mappings keyed by canonical pack ID
  ...                       other reusable test inputs

shared/
  assets.json               canonical whole-file → portable pack-copy mappings
  fragments.json            canonical manifest-fragment → marked target mappings
  templates/...             canonical reusable template assets
  manifests/...             canonical reusable dryv.pack.yaml policy fragments

scripts/
  lib/repository.ts         pack discovery, identity and path rules
  test-pack.ts              fixture harness
  catalog.ts                catalogue projection and validation
  sync-shared.ts            synchronizes canonical portable assets
  audit-duplication.ts      rejects risky unmanaged duplication
  release-tag.ts            validates canonical release tags
```

Pack-local `tests/fixture/` contains only files specific to that pack's test project. It never contains a private Runtime IR document.

An activation selects a source collection and a path within it. See the repository [README](../README.md) and each pack's `tests/fixture/dryv.yaml` for executable Usage examples.
