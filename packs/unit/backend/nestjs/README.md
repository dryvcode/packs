# NestJS application pack

Generates the runnable shell of a NestJS application: `src/main.ts`, `package.json`, `tsconfig.json`, `nest-cli.json` and `test/app.e2e-spec.ts`.

`main.ts` and the e2e test import `./app.module.ts`, which `inject/backend/nestjs` generates. Map that pack's `app` output slot to this unit's `src/`:

```yaml
server:
  source: { $ref: "#/sources/packs/local", path: inject/backend/nestjs }
  destination: { $ref: "#/destinations/app", root: [src, modules] }
  destinations:
    app: { $ref: "#/destinations/app", root: [src] }
```

The [example](dryv.example.yaml) shows the full composition: shared types, DTOs, the project's use-cases pack and the NestJS modules.

**Test:** `bun scripts/test-pack.ts unit/backend/nestjs` generates the application with a test implementation pack, installs it, typechecks it and boots `AppModule`.
