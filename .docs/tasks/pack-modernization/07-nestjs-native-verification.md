# 07 — NestJS native verification

Status: **done**

## Result

The pack repo now has executable fixtures for both:

```text
inject/backend/nestjs
unit/backend/nestjs
```

The inject fixture renders class-validator + TypeORM and zod variants, typechecks generated NestJS feature code, boots test modules, and sends HTTP requests.

The unit fixture renders a complete NestJS application composition, installs dependencies inside the generated `app/`, typechecks it, and boots the generated `AppModule` through `@nestjs/testing`.

Native verification is run through:

```bash
bun scripts/test-pack.ts inject/backend/nestjs unit/backend/nestjs
```
