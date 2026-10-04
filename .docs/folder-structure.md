# Folder structure

Public packs are organized as `packs/<layout>/<purpose>/<name>`.

| Layout | Role | Examples |
| --- | --- | --- |
| `inject` | Contributes files to a destination owned by the project or another pack | TypeORM entities, class-validator DTOs |
| `package` | Owns a generated package with a declared package name and optional import root | Dart and TypeScript clients, FastAPI library |
| `project` | Owns a generated application | Flutter, React Native and Next.js apps |

The scalar `layout` in `dryv.pack.yaml` is authoritative; `inject` is the default. A `package` pack declares `package.name` as a reference to an input. The folder hierarchy does not supply Runtime IR meaning. Language and framework tags belong in `catalog` metadata, never in Engine context.

An activation selects a source collection and a path within it. See the repository [README](../README.md) and each pack's `tests/fixture/dryv.yaml` for executable Usage examples.
