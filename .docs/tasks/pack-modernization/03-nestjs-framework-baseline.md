# 03 — NestJS framework baseline

Status: **done**

## Artifact matrix

| Canonical trigger | Implementation responsibility | Artifact | Scope | Owner |
| --- | --- | --- | --- | --- |
| HTTP operation collection by feature | HTTP adapter | controller methods | feature | `inject/backend/nestjs` |
| Feature with HTTP operations | provider boundary | injectable service with overridable methods | feature | `inject/backend/nestjs` |
| Feature with HTTP operations | Nest composition | feature module | feature | `inject/backend/nestjs` |
| Bound `operation.server` modules | root registration | `AppModule` imports | application | `unit/backend/nestjs` |
| Application | bootstrap | `main.ts` | application | `unit/backend/nestjs` |
| Application | package/tooling | `package.json`, `tsconfig.json`, `nest-cli.json`, e2e test | application | `unit/backend/nestjs` |

## Decisions

- Feature implementation is owned by the inject pack: controller, service and module live together under `group/feature`.
- The service is a concrete `@Injectable()` with default `NotImplementedException` methods so a generated app boots without handwritten implementations.
- The unit pack owns only root application files and consumes declared `operation.server` representations.
- Root assembly is driven by Dryv dependency metadata, not by scanning generated folders.

## Generic Engine gap fixed

The planner now lets a template that imports a slot for its own subject kind depend on the provider representation for the same subject. This lets an aggregate operation template import bound `operation.server` modules without Nest-specific Engine logic.
