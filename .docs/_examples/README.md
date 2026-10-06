# Proposed Dryv pack architecture examples

These files are **design examples**, not current executable packs.

They illustrate the proposed architecture being planned for Dryv `v1alpha1`:

- `inject | unit` pack layouts;
- simple pack names;
- source-neutral `dryv.example.yaml`;
- named output placements;
- per-need compatibility checks;
- capability representation contracts;
- same-unit locality;
- aggregate capability consumption;
- explicit project `dryv.yaml` after example materialization.

The active design documents are:

- `.docs/planning/pack-layout-refactor.md`
- `.docs/planning/pack-identity-and-composition.md`
- `.docs/planning/pack-examples-and-placements.md`

The corresponding Engine roadmap lives in the Dryv repository:

`.docs/planning/roadmap/pack-placement-and-validation/README.md`

## Example set

The primary example is a NestJS backend composed from four packs:

```text
unit/backend/nestjs
    needs operation.server
            │
            ▼
inject/backend/nestjs
    ├── needs schema.validation
    └── needs schema.persistence
            │
      ┌─────┴────────┐
      ▼              ▼
inject/validation/zod
inject/persistence/typeorm
```

See:

`.docs/_examples/proposed-pack-architecture/`
