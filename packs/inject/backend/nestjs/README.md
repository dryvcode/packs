# NestJS backend pack

Injects NestJS modules into a project, following the NestJS module structure:

```text
<app slot>/app.module.ts                  managed: imports the group modules (and DatabaseModule)
<app slot>/database/database.module.ts    scaffold: yours (driver, connection, migrations)
<destination>/<group>/<group>.module.ts   managed: imports the group's feature modules
<destination>/<group>/<feature>/
  <feature>.controller.ts                 managed: routes each `http` facet, calls the service contract
  <feature>.service.ts                    managed: abstract service contract
  <feature>.module.ts                     managed: binds the contract to your implementation
<destination>/common/server/              shared cookie decorator and schema-validation pipe
```

The controller routes each `http` facet (`GET /users/{id}` → `@Get("/users/:id")`) and calls the abstract `<Group><Feature>Service`. The feature module binds that token to the project's implementation and registers its use cases:

```ts
providers: [
  { provide: BookingsService, useClass: BookingsServiceImpl satisfies Type<BookingsService> },
  CreateBookingUseCase,
  FindBookingsUseCase,
],
```

`satisfies Type<…>` makes type checking fail when the implementation drifts from the contract. `AppModule` imports `DatabaseModule` only when the feature modules use generated entities.

It generates no DTOs, entities, implementations or use cases. It imports them through slots the project binds:

```yaml
packs:
  types: { source: …/inject/types/typescript }
  dtos: { source: …/class-validator, bind: { property.enum.types: …, property.types: … } }
  entities: { source: …/typeorm, bind: { property.enum.types: …, property.types: … } }
  use-cases: { source: …/your-use-cases-pack }          # ServiceImpl per feature + use case per operation
  server:
    source: …/inject/backend/nestjs
    destination: { $ref: '#/destinations/modules' }     # e.g. src/modules
    destinations:
      app: { $ref: '#/destinations/app' }               # e.g. src (app.module.ts, database/)
    bind:
      schema.validation: { $ref: '#/packs/dtos' }       # or zod / joi
      schema.persistence: { $ref: '#/packs/entities' }  # optional
      operation.implementation: { $ref: '#/packs/use-cases' }
      operation.usecase: { $ref: '#/packs/use-cases' }
```

| Bound validation pack | Parameters and results | Validation |
| --- | --- | --- |
| class-validator | DTO classes | Nest's global `ValidationPipe` |
| zod | `z.infer<typeof XSchema>` | generated `SchemaValidationPipe(XSchema)` |
| joi | `Record<string, unknown>` | generated `SchemaValidationPipe(XSchema)` |

When persistence is bound, the feature module registers the entities its operations use with `TypeOrmModule.forFeature([...])`. The pipe duck-types zod and Joi, so the output compiles with whichever library the project uses.

**Test:** `bun scripts/test-pack.ts inject/backend/nestjs` renders the shared IR twice (over class-validator + TypeORM, and over zod) with a test implementation pack, typechecks both against the real framework, boots them, sends valid and invalid requests, and boots the full `AppModule` → group → feature assembly.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows every activation and binding.

## Slots

- needs `schema.validation`, `operation.implementation`, `operation.usecase` (required)
- needs `schema.persistence` (optional)
- provides `operation.server` (the feature module)

## Output slots

- `app`: `app.module.ts` and the `database/` scaffold.

## Generated tests

Vitest specs, regenerated with the contracts:

- `<feature>.controller.e2e.spec.ts`: each operation's route, input binding (path, query, headers, cookies, body), contract status code and response passthrough, plus rejection of an invalid body, with the project implementation mocked. Valid payloads come from the bound `schema.examples` pack; without one, body checks are `todo`.
- `app.e2e.spec.ts` (app slot): the assembled AppModule boots and serves every contract route (no 404).

`vitest.config.ts` is scaffolded in the app slot; run `vitest run --root <app slot>`. With pnpm, approve esbuild's build script (`pnpm approve-builds`), which Vitest needs.
