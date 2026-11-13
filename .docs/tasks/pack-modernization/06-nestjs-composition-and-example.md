# 06 — NestJS composition and example

Status: **done**

## Result

`packs/unit/backend/nestjs/dryv.example.yaml` shows the real composition:

```text
unit/backend/nestjs
  needs operation.server
    -> inject/backend/nestjs
         needs schema.validation -> inject/validation/class-validator
         needs schema.persistence -> inject/persistence/typeorm
```

The example uses the unambiguous pack source shape:

```yaml
source: { $ref: "#/sources/packs/local", path: unit/backend/nestjs }
```

Destination roots place unit files at `app/`, feature modules under `app/src`, DTOs under `app/src/dto`, and TypeORM entities under `app/src/entities`.
