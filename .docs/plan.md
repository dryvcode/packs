# Packs repository plan

Status: **draft**. Items marked *open* need the owner's decision before work starts.

## Goal

`dryvcode/packs` is Dryv's public home for **global packs**: packs that generate code for well-known packages and frameworks such as TypeORM, Mongoose, NestJS, Next.js and zod. Dryv owns the repo, and it's licensed under the GNU GPL v3.

Projects use three kinds of packs:

| Kind | Where it lives | Use |
| --- | --- | --- |
| **Global packs** | This repo | Well-known packages and frameworks. Always preferred over local copies. |
| **Local packs** | A project's own `dryv/packs/` | Designs the project invented, which no global pack could know |
| **Private git packs** | Any private git repo the user can access | Shared packs that must not be public |

## Decisions taken

| Topic | Decision |
| --- | --- |
| Repository | `dryvcode/packs`, public, GNU GPL v3 |
| Pinning | **Per-pack tags** named after the pack's path: `typescript/jinja/mongoose/v0.1.0` |
| Starter packs | The packs in the Dryv repo's `_examples/packs` |
| Folder structure | `packs/<language>/<template-language>/<name>`; multi-language packs in `packs/multi/`. See [folder-structure.md](folder-structure.md). |
| Catalogue | A JSON catalogue with each pack's tags, generated in CI from pack metadata and published with releases (not committed) |
| Global before local | Packs for well-known packages and frameworks are **never** local. They come from this repo. This is Dryv best practice. |
| Local packs | Only for a project's own designs, such as a custom type-file layout or a use-case design |

## What deserves a local pack

A local pack captures a design the project invented. Two examples come from the first real project using Dryv (`alidantech-api`, in its `_archives/`):

- **Custom type files:** `src/types/schema/auth/challenge/` with `config.ts`, `index.ts` and `types.ts`. Each schema gets a folder of typed config, keys, relations and sortable fields, built on shared helpers.
- **Use cases:** `src/modules/auth/resource/auth/use-cases/refresh-session.usecase.ts`. An injectable class per use case, implementing its interface, with repositories and providers injected.

## Generated file ownership (desired Dryv behaviour)

| Mode | Behaviour |
| --- | --- |
| **Regenerated** (default) | Dryv owns the file. Every generate may rewrite or delete it. |
| **Generated once** (custom) | Dryv writes the file the first time only. After that it belongs to the developer, and Dryv never edits or deletes it. |

- A pack decides the mode per template.
- Later goal: **diffing**, where Dryv knows the exact lines it produced and updates only those.
- Not implemented yet. The design and its open questions are in the Dryv repo: `.docs/planning/roadmap/generated-file-ownership.md`.

## Using packs from a project

Dryv already supports git packs. The client fetches them with the user's own `git`, so private repos work with the user's existing credentials.

```yaml
packs:
  entities:                       # a global pack, pinned to its tag
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: typescript/jinja/typeorm-entities/v0.1.0
      path: packs/typescript/jinja/typeorm-entities
  billing:                        # a local pack
    source:
      type: local
      path: dryv/packs/billing
  internal:                       # a private git pack
    source:
      type: git
      repository: git@github.com:<org>/<private-repo>.git
      revision: <tag or commit>
      path: <pack folder>
```

### Ideas for making global packs easier (*open*)

- **A `dryv` source type:** Dryv already knows this repo, so a project could write only the pack's name and version, for example `source: { type: dryv, pack: typescript/jinja/typeorm-entities, version: 0.1.0 }`. Dryv works out the repository, tag and path.
- **A pack tool:** a CLI command such as `dryv packs search` / `dryv packs add <name>`, which lists the catalogue, picks a version and writes the `dryv.yaml` entry.

## Open questions

1. Do the starter packs move out of the Dryv repo, or get copied while the Dryv examples keep their own copies?
2. Which global packs come first? The alidantech-api project needs TypeORM, Mongoose, NestJS and Next.js. Mongoose and Next.js packs don't exist yet.
3. How should pack tags start: `0.1.0`, or `0.0.1` to match the other Dryv packages?
4. The `dryv` source type: wanted? If so, what does it look like?
5. A pack tool (`dryv packs add`): wanted? If so, in the CLI, the VS Code extension, or both?
6. The design of generated-once mode (tracked in the Dryv repo).
7. The pack metadata for the catalogue: which fields (tags, frameworks, description…) and where they sit in `dryv.pack.yaml`.
