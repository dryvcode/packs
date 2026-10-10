# Changelog

## 0.3.0

- Split each feature into `<feature>.controller.ts`, `<feature>.service.ts` and `<feature>.module.ts`, following NestJS conventions; the module remains the `operation.server` provider.
- Move the cookie parameter decorator to `common/server/http/cookie.decorator.ts`.
- Remove the unfinished feature API contract template (its `codepot-openapi@0.0.4` dependency cannot be installed).

## 0.1.0

- First release in `dryvcode/packs`, copied from the Dryv repository's example `nestjs` pack.
