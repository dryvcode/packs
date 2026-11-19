# 04 — NestJS inject pack

Status: **done**

Target:

```text
packs/inject/backend/nestjs
```

## Result

The inject pack now declares `layout: inject`, key `inject.backend.nestjs`, and provides `operation.server` through its `feature` template.

It generates feature-level NestJS artifacts only:

- controller methods for HTTP operations;
- an injectable service boundary with overridable methods;
- a feature module that registers controllers, service and optional TypeORM entities;
- feature/root barrels.

It keeps validation and persistence as explicit needs:

```yaml
needs:
  schema.validation: { required: true }
  schema.persistence: { required: false }
provides:
  operation.server:
    $ref: '#/templates/feature'
```

Project setup and root application concerns are intentionally absent.
