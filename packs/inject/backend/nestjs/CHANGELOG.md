# Changelog

## 0.4.0

- `<feature>.service.ts` is an abstract contract; `<feature>.module.ts` binds it to the project's implementation (`operation.implementation`) with `satisfies Type<…>` and registers per-operation use cases (`operation.usecase`).
- Add `<group>/<group>.module.ts` and `app.module.ts` (written to the `app` output slot); scaffold `database/database.module.ts`, imported only when generated entities are used.

## 0.3.0

- Split each feature into `<feature>.controller.ts`, `<feature>.service.ts` and `<feature>.module.ts`, following NestJS conventions; the module remains the `operation.server` provider.
- Move the cookie parameter decorator to `common/server/http/cookie.decorator.ts`.
- Remove the unfinished feature API contract template (its `codepot-openapi@0.0.4` dependency cannot be installed).

## 0.1.0

- First release in `dryvcode/packs`, copied from the Dryv repository's example `nestjs` pack.
