# Folder structure

Status: **decided**. Authority: [pack-design-decisions.md](pack-design-decisions.md) §1.

```text
packs/<purpose>/<pack-name>
```

```text
packs/
├── persistence/
│   ├── typeorm-entities/
│   └── mongoose-models/
├── validation/
│   ├── class-validator-dtos/
│   ├── zod-schemas/
│   └── joi-schemas/
├── backend/
│   ├── nestjs-backend/
│   └── fastapi-backend/
├── clients/
│   └── dart-client-sdk/
└── frontend/
    └── nextjs-app/
```

| Rule | Decision |
| --- | --- |
| Levels | The pack's primary purpose, then its name |
| Runtime meaning | None. A pack declares what it provides and needs in `dryv.pack.yaml`. The engine never infers anything from folders. |
| Other dimensions | Languages, frameworks and tags go in the pack's `catalog` metadata. The generated catalogue exposes them for search. |
| New purposes | Added only when a real pack needs one |
| Tags | `<purpose>/<pack-name>/v<version>`, e.g. `persistence/typeorm-entities/v0.1.0` |

A project references a pack explicitly:

```yaml
packs:
  entities:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: persistence/typeorm-entities/v0.1.0
      path: packs/persistence/typeorm-entities
```

## Pack layout: inject or standalone

Every pack states its layout in `catalog.layout`:

| Layout | Paths | Examples |
| --- | --- | --- |
| `inject` | Start at the module, group or feature (e.g. `analytics/alias-suggestion.dto.ts`). The pack never adds a project root such as `src/`; the project's destination supplies it (e.g. `src/modules/dto`). | nestjs-backend, typeorm-entities, mongoose-models, class-validator-dtos, zod-schemas, joi-schemas |
| `standalone` | The pack defines a complete unit from its own root: a package, an SDK, an app tree. | flutter-api-bridge, dart-client-sdk, next-api-bridge, nextjs-app, fastapi-backend |

## Rejected structures

- `packs/<language>/<template-language>/<name>`: made the template implementation part of a pack's public identity.
- `packs/<name>` (flat): hard to browse once the repo holds many packs.
- `packs/<language>/<group>/<name>`: the group level separated little; most TypeScript packs are "npm".
