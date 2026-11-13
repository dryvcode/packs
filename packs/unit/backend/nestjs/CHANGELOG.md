# Changelog

## 0.3.0

- Drop the pack's own `AppModule`; `main.ts` and the e2e test import the `AppModule` that `inject/backend/nestjs` generates through its `app` output slot.

## 0.1.0

- Initial composable NestJS backend project shell.
