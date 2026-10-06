---
status: draft
updated: 2026-10-06
scope: research-only
---

# Primary reference index

References are intentionally dominated by official framework/project documentation. Dates/versions reflect material available during research on 2026-10-06.

## Dryv current-state evidence

- Dryv Engine repository, `develop`: https://github.com/dryvcode/dryv/tree/develop
- Dryv packs repository, `develop`: https://github.com/dryvcode/packs/tree/develop
- Runtime IR reference: https://github.com/dryvcode/dryv/tree/develop/.docs/reference/ir
- Pack reference: https://github.com/dryvcode/dryv/blob/develop/.docs/reference/packs.md
- Template context reference: https://github.com/dryvcode/dryv/tree/develop/.docs/reference/context
- Pack design research/reference: https://github.com/dryvcode/dryv/tree/develop/.docs/reference/pack-design

Representative pack evidence used in this study:

- NestJS inject pack: https://github.com/dryvcode/packs/tree/develop/packs/inject/backend/nestjs-backend
- Flutter project pack: https://github.com/dryvcode/packs/tree/develop/packs/project/frontend/flutter-app
- Next.js project pack: https://github.com/dryvcode/packs/tree/develop/packs/project/frontend/nextjs-app
- FastAPI backend pack: https://github.com/dryvcode/packs/tree/develop/packs/package/backend/fastapi-backend
- ASP.NET Core backend pack: https://github.com/dryvcode/packs/tree/develop/packs/package/backend/aspnet-core-backend
- HTTP smoke pack: https://github.com/dryvcode/packs/tree/develop/packs/package/testing/http-smoke-tests
- k6 smoke pack: https://github.com/dryvcode/packs/tree/develop/packs/package/testing/k6-smoke-tests
- Postman pack: https://github.com/dryvcode/packs/tree/develop/packs/package/testing/postman-collection

## NestJS

- Modules: https://docs.nestjs.com/modules
- Providers: https://docs.nestjs.com/providers
- Testing: https://docs.nestjs.com/fundamentals/testing
- CLI usage / generate schematics: https://docs.nestjs.com/v11/cli/usages

Key evidence used:

- modules organize related capabilities and explicitly list controllers/providers/imports/exports;
- feature modules group closely related domain capability;
- Nest scaffolds unit/E2E testing support;
- `nest generate` can generate and/or modify files and exposes a broad framework artifact vocabulary.

## Spring Boot / Spring Modulith / Spring Initializr

- Spring Boot — Structuring Your Code: https://docs.spring.io/spring-boot/4.2/reference/using/structuring-your-code.html
- Spring Modulith — Fundamentals: https://docs.spring.io/spring-modulith/reference/fundamentals.html
- Spring Modulith — Verification: https://docs.spring.io/spring-modulith/reference/verification.html
- Spring Modulith — Integration Testing: https://docs.spring.io/spring-modulith/reference/testing.html
- Spring Modulith — Documentation: https://docs.spring.io/spring-modulith/reference/documentation.html
- Spring Initializr Reference: https://docs.spring.io/initializr/docs/current/reference/html/
- Spring Initializr ProjectDescription API: https://docs.spring.io/initializr/docs/current/api/io/spring/initializr/generator/project/ProjectDescription.html

Key evidence used:

- Spring Boot allows flexible layout but recommends root-package placement;
- Modulith models provided/internal/required module interfaces and verifies dependencies;
- module-scoped testing is first-class;
- Initializr normalizes project description/configuration before conditional contributors generate assets.

## Flutter

- Architecture guide: https://docs.flutter.dev/app-architecture/guide
- Architecture recommendations: https://docs.flutter.dev/app-architecture/recommendations
- Architecture case study / package structure: https://docs.flutter.dev/app-architecture/case-study
- UI layer case study: https://docs.flutter.dev/app-architecture/case-study/ui-layer
- Data layer case study: https://docs.flutter.dev/app-architecture/case-study/data-layer
- Testing overview: https://docs.flutter.dev/testing/overview
- Integration testing: https://docs.flutter.dev/testing/integration-tests
- Pubspec: https://docs.flutter.dev/tools/pubspec

Key evidence used:

- Views + ViewModels, Repositories + Services;
- mixed feature/type organization in the official large-app case study;
- unit/widget/integration tests have different confidence/cost roles;
- pubspec carries dependencies and asset/plugin project configuration.

## Angular

- Style guide: https://angular.dev/style-guide
- Testing: https://angular.dev/guide/testing
- Authoring schematics: https://angular.dev/tools/cli/schematics-authoring

Key evidence used:

- organize by feature rather than global code-type directories;
- colocated `.spec.ts` tests;
- schematic `Tree` stages changes and supports create/rename/overwrite/delete with merge strategies.

## Next.js

- App Router file-system conventions: https://nextjs.org/docs/app/api-reference/file-conventions
- Route Groups: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- Dynamic Segments: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
- Parallel Routes: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
- Intercepting Routes: https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes
- `page` convention: https://nextjs.org/docs/app/api-reference/file-conventions/page
- `layout` convention: https://nextjs.org/docs/app/api-reference/file-conventions/layout
- `loading` convention: https://nextjs.org/docs/app/api-reference/file-conventions/loading

Key evidence used:

- path/folder syntax is framework-significant, including brackets, parentheses and `@` slots;
- special files have routing/rendering behavior;
- filesystem topology therefore must remain opaque to the Engine while being faithfully preserved.

## FastAPI

- Bigger Applications / APIRouter: https://fastapi.tiangolo.com/tutorial/bigger-applications/

Key evidence used:

- routers group path operations and shared dependencies/prefixes/responses;
- routers are explicitly included into applications/other routers;
- child implementation therefore needs aggregate registration.

## Django

- First app / project structure: https://docs.djangoproject.com/en/5.2/intro/tutorial01/
- Testing overview: https://docs.djangoproject.com/en/5.2/topics/testing/overview/
- Reusable apps: https://docs.djangoproject.com/en/5.2/intro/reusable-apps/

Key evidence used:

- distinction between project bootstrap and reusable apps;
- conventional project files (`settings`, `urls`, ASGI/WSGI);
- tests can grow from one file into organized test packages.

## Ruby on Rails

- Command line / generators: https://guides.rubyonrails.org/command_line.html
- Generators and templates: https://guides.rubyonrails.org/generators.html
- Testing Rails applications: https://guides.rubyonrails.org/testing.html

Key evidence used:

- scaffold/resource generation creates artifact families;
- `--pretend` previews planned generation;
- generators can create/copy/insert/update routes and run commands;
- unit/controller/integration/system tests occupy different scopes and system tests are best reserved for critical paths.

## Laravel

- Directory Structure: https://laravel.com/framework/docs/structure

Key evidence used:

- conventional root directories coexist with freedom to organize autoloadable classes;
- several application directories appear only when the corresponding capability is generated;
- tests are a standard top-level part of the project.

## ASP.NET Core

- Fundamentals: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/
- Routing: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing
- Areas: https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/areas?view=aspnetcore-10.0
- Minimal API testing: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/test-min-api

Key evidence used:

- several HTTP implementation styles exist inside one framework;
- Areas provide feature-oriented folder/routing structure;
- integration tests can live in a separate test project referencing the SUT.

## Generator-system comparisons

### Nx

- Creating Files with a Generator: https://nx.dev/docs/kb/creating-files
- `generateFiles`: https://nx.dev/docs/reference/devkit/generateFiles
- `Tree`: https://nx.dev/docs/reference/devkit/Tree
- Generator: https://nx.dev/docs/reference/devkit/Generator

Evidence:

- virtual/atomic filesystem changes;
- create/update/move/delete;
- dynamic file names;
- explicit overwrite strategies;
- dry-run preview;
- formatter/package-install follow-up tasks.

### OpenAPI Generator

- Templating: https://openapi-generator.tech/docs/templating/
- Customization / selective generation: https://openapi-generator.tech/docs/customization/

Evidence:

- normalized generator model is projected into templates;
- separate model/API/supporting-file classes;
- selective generation can independently control models/APIs/supporting files/tests/docs;
- supporting files can receive broad generator context or be copied statically.

## How references should be used

These sources are evidence, not Dryv requirements. A framework convention can justify a pack implementation choice or expose a missing neutral capability. It cannot by itself justify adding the framework's nouns to Runtime IR.

When a future proposal cites this research, it should point to the exact evidence and state which layer is affected:

```text
semantic meaning
derived context/index
pack selection
pack/planner artifact model
template rendering
client workspace behavior
```