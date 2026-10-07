# 05 — NestJS unit pack

Status: **done**

Target:

```text
packs/unit/backend/nestjs
```

## Result

The unit pack now declares `layout: unit`, key `unit.backend.nestjs`, and needs only `operation.server`.

It owns root NestJS application artifacts:

- `package.json`;
- `tsconfig.json`;
- `nest-cli.json`;
- `src/main.ts`;
- `src/app.module.ts`;
- `test/app.e2e-spec.ts`.

`AppModule` imports bound feature modules through `file.dependencies[]` from `operation.server`; it does not duplicate controllers/services/modules, scan folders, or hardcode the inject pack path.
