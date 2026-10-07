# Proposed Dryv pack architecture examples

These files are supporting design/review fixtures.

They are not the active execution plan and are not a substitute for the real packs.

Current execution is tracked under:

```text
.docs/tasks/pack-modernization/
```

The examples illustrate the target concepts used by the current tasks:

- `inject | unit` layouts;
- simple layout-aware pack identity;
- keyed `needs`;
- explicit capability bindings;
- activation destination roots;
- activation-owned output overrides;
- Usage-shaped `dryv.example.yaml`;
- ordered sibling `$options`;
- explicit materialized `dryv.yaml`;
- aggregate composition such as a NestJS unit consuming `operation.server`.

The primary review graph is:

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

See `.docs/_examples/proposed-pack-architecture/`.

The real NestJS framework-quality target is defined by Tasks 03–07, not by blindly preserving these fixtures.
