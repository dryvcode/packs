# Folder structure

Status: **decided** (2026-10-03).

## Decision

```text
packs/<language>/<template-language>/<name>
```

```text
packs/
├── typescript/
│   ├── jinja/
│   │   ├── typeorm-entities/
│   │   ├── zod-schemas/
│   │   └── nestjs-backend/
│   └── handlebars/
│       └── mongoose/            may coexist with typescript/jinja/mongoose
├── python/jinja/fastapi-backend/
├── dart/jinja/dart-client-sdk/
└── multi/jinja/openapi-spec/    packs that emit several languages
```

| Rule | Decision |
| --- | --- |
| Levels | Emitted language, then templating language, then name. No grouping level (npm, pypi…). |
| Multi-language packs | `packs/multi/<template-language>/<name>` |
| Same name, other templating | Allowed. A rewrite in another templating language is a new pack next to the old one, so existing paths never change. |
| Tags | The full path, then the version: `typescript/jinja/mongoose/v0.1.0` |
| Grouping and search | Pack tags and categories live in each pack's metadata. CI generates a JSON catalogue from them (not committed) and publishes it with each release. |

A project references a pack like this:

```yaml
source:
  type: git
  repository: https://github.com/dryvcode/packs
  revision: typescript/jinja/typeorm-entities/v0.1.0
  path: packs/typescript/jinja/typeorm-entities
# with the proposed dryv source type
# source: { type: dryv, pack: typescript/jinja/typeorm-entities, version: 0.1.0 }
```

The options below were compared before the decision.

Every option below is shown with the same five packs, so they can be compared directly:

| Pack | Emits | Templates | Library ecosystem |
| --- | --- | --- | --- |
| `typeorm-entities` | TypeScript | Jinja | npm |
| `zod-schemas` | TypeScript | Jinja | npm |
| `nestjs-backend` | TypeScript | Jinja | npm |
| `fastapi-backend` | Python | Jinja | PyPI |
| `dart-client-sdk` | Dart | Jinja | pub |

…plus one awkward case: a hypothetical `openapi-spec` pack that emits YAML plus TypeScript and Python clients.

## What any structure must handle

1. **Paths are public API.** A project's `dryv.yaml` names the pack's folder, or, with a `dryv` source type, a name derived from it. Moving a folder breaks every project that uses it.
2. **Tags are per pack**, such as `typeorm-entities-v0.1.0`, so pack names must be unique across the whole repo, whatever the folders look like.
3. **Some packs fit more than one category**, emitting several languages or combining several libraries.
4. **People browse and search.** On GitHub, in the docs and in a pack tool.

## Option 1: the owner's idea, `packs/<emitted-language>/<templating-language>/<group>/<name>`

```text
packs/
├── typescript/
│   └── jinja/
│       └── npm/
│           ├── typeorm-entities/
│           ├── zod-schemas/
│           └── nestjs-backend/
├── python/
│   └── jinja/
│       └── pypi/
│           └── fastapi-backend/
└── dart/
    └── jinja/
        └── pub/
            └── dart-client-sdk/
```

```yaml
path: packs/typescript/jinja/npm/typeorm-entities
# with a dryv source type
pack: typescript/jinja/npm/typeorm-entities      # or just: typeorm-entities
```

- **Good:** the most browsable. Every dimension is visible in the path.
- **Breaks when** a pack's templates move from Jinja to Handlebars: the pack hasn't changed, but its path has, so every project using it breaks. Templating language is an implementation detail.
- **No home** for `openapi-spec`, which emits several languages.
- **Ambiguous group:** almost every TypeScript pack is "npm", so the level adds depth but separates little. A pack targeting a database (SQL migrations) has no package manager at all.

## Option 2: Option 1 without the templating level, `packs/<language>/<group>/<name>`

```text
packs/
├── typescript/
│   └── npm/
│       ├── typeorm-entities/
│       ├── zod-schemas/
│       └── nestjs-backend/
├── python/pypi/fastapi-backend/
├── dart/pub/dart-client-sdk/
└── multi/openapi-spec/
```

```yaml
path: packs/typescript/npm/typeorm-entities
```

- **Good:** browsable, and paths survive a template rewrite.
- **Weak:** the group level still separates little, and multi-language packs need a special `multi/` folder.

## Option 3: by language, `packs/<language>/<name>`

```text
packs/
├── typescript/
│   ├── typeorm-entities/
│   ├── zod-schemas/
│   └── nestjs-backend/
├── python/fastapi-backend/
├── dart/dart-client-sdk/
└── multi/openapi-spec/
```

```yaml
path: packs/typescript/typeorm-entities
```

- **Good:** short, browsable by the dimension people look for first, and a pack's target language rarely changes.
- **Weak:** still needs `multi/` for multi-language packs.

## Option 4: flat, `packs/<name>`, with the categories in metadata

```text
packs/
├── typeorm-entities/
├── zod-schemas/
├── nestjs-backend/
├── fastapi-backend/
├── dart-client-sdk/
└── openapi-spec/
```

Each `dryv.pack.yaml` carries the categories, for example:

```yaml
catalog:
  languages: [typescript]
  templating: jinja
  ecosystem: npm
  frameworks: [typeorm]
  tags: [entities, persistence]
```

```yaml
path: packs/typeorm-entities
# with a dryv source type
pack: typeorm-entities
```

- **Good:** paths never change. Multi-language packs fit naturally. A generated catalogue (the README, the Dryv site, a pack tool) can group packs by **every** dimension at once, where a folder tree can only group by one. The `dryv` source type is simply the pack name.
- **Weak:** browsing raw folders on GitHub shows one long list until the catalogue exists. Needs a catalogue generator, and a check that every pack has its metadata.

## How each option looks with a `dryv` source type

| Option | `dryv.yaml` entry |
| --- | --- |
| 1 | `{ type: dryv, pack: typescript/jinja/npm/typeorm-entities, version: 0.1.0 }` |
| 2 | `{ type: dryv, pack: typescript/npm/typeorm-entities, version: 0.1.0 }` |
| 3 | `{ type: dryv, pack: typescript/typeorm-entities, version: 0.1.0 }` |
| 4 | `{ type: dryv, pack: typeorm-entities, version: 0.1.0 }` |

With options 1–3, Dryv could still accept the bare name (`typeorm-entities`), because names are unique. But then the folders exist only for browsing.

## Repository files around the packs (same in every option)

```text
README.md            what the repo is, how to use a pack, the catalogue
LICENSE              GNU GPL v3
.docs/               plan and design notes
scripts/             pack test harness and catalogue generator
.github/workflows/   test every pack on PRs; release a pack from its tag
```

## Comparison

| | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Path survives a template rewrite | no | yes | yes | yes |
| Multi-language packs | no home | `multi/` | `multi/` | natural |
| Browse folders on GitHub | best | good | good | catalogue needed |
| Group by several dimensions | no | no | no | yes (catalogue) |
| Short `dryv.yaml` entries | no | no | fairly | yes |

**Recommendation (for the owner to accept or reject):** Option 4, or Option 3 if browsing folders on GitHub matters more than everything else.
