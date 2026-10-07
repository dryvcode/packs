# NestJS backend pack

Generates, for every feature with HTTP operations:

- an abstract `<Group><Feature>Service` that handwritten code implements;
- a `<Group><Feature>Controller` that routes each `http` facet (`GET /users/{id}` → `@Get("/users/:id")`) and delegates to the service;
- a `<Group><Feature>Module.register(Implementation)` that binds the two.

It doesn't generate DTOs or entities. It imports them through slots the project binds:

```yaml
packs:
  dtos: { source: …/class-validator }
  entities: { source: …/typeorm }
  server:
    source: …/nestjs
    bind:
      schema.validation: { $ref: '#/packs/dtos' }       # or zod / joi
      schema.persistence: { $ref: '#/packs/entities' }  # optional
```

| Bound validation pack | Parameters and results | Validation |
| --- | --- | --- |
| class-validator | DTO classes | Nest's global `ValidationPipe` |
| zod | `z.infer<typeof XSchema>` | generated `SchemaValidationPipe(XSchema)` |
| joi | `Record<string, unknown>` | generated `SchemaValidationPipe(XSchema)` |

When persistence is bound, the feature module registers the entities its operations use with `TypeOrmModule.forFeature([...])`. The pipe duck-types zod and Joi, so the output compiles with whichever library the project uses.

**Test:** `bun scripts/test-pack.ts inject/backend/nestjs` renders the flagship IR twice (over class-validator + TypeORM, and over zod), typechecks both against the real framework, then boots them and sends valid and invalid requests.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- needs `schema.validation`
- needs `schema.persistence`
