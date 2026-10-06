# Public packs TODO

This file is the small index for public-pack ecosystem coverage.

Detailed research and candidate tasks live in [ecosystems/](ecosystems/).

> The numbering in `.docs/ecosystems/` is for navigation only. It is **not** implementation priority.
>
> Checked items mean the pack already exists on `develop`. Unchecked items are research/implementation candidates, not approved work.

## Rules

- [x] Work only on `develop`.
- [x] Keep all contracts on `v1alpha1`.
- [x] Reuse existing pack architecture and patterns.
- [x] Keep Runtime IR as the only semantic authority.
- [x] Keep framework/library mapping inside packs.
- [x] Use one shared Runtime IR fixture at `fixtures/dryv.ir.yaml`; pack-local IR copies are prohibited.
- [x] Keep exact reusable portable assets under `shared/` with synchronized pack-local copies.
- [x] Reject unmanaged duplicate templates/fixtures with repository checks.
- [x] Derive catalogue entries from `dryv.pack.yaml`; never maintain a second pack list.
- [ ] Audit a candidate before implementation.
- [ ] Confirm renderer, selections, slots, dependencies and fixture strategy before implementation.
- [ ] Report context/Engine gaps instead of hiding them in templates.
- [ ] Get approval for each implementation batch.
- [ ] Let the user run fixture/toolchain tests locally before claiming a pack passes.


## Scheduled next: pack layout refactor

This is the next repository-wide structural refactor. The current repository still uses `inject | package | project`, but the approved direction is `inject | unit`. Execution plan: [planning/pack-layout-refactor.md](planning/pack-layout-refactor.md).

- [ ] Update Dryv `dryv.pack/v1alpha1` layout contract from `inject | package | project` to `inject | unit`.
- [ ] Make package/import identity optional metadata on root-owning units rather than a layout.
- [ ] Preserve managed/scaffold ownership strictly at resource level.
- [ ] Stress test unit ownership, actions, dependency merging and cross-unit imports before migration.
- [ ] Migrate `packs/package/**` to `packs/unit/**`.
- [ ] Migrate `packs/project/**` to `packs/unit/**`.
- [ ] Remove artificial package identities from outputs such as Postman, k6, HTTP smoke and OpenAPI bundles where no package identity exists.
- [ ] Update catalogue IDs, release tags, fixtures, scripts and documentation in the same migration.
- [ ] Reject old `package` / `project` layout spellings after migration; do not add compatibility aliases while remaining on `v1alpha1`.
- [ ] Do not add new `project` packs solely because generated files are editable.

See the canonical research in the Dryv repository:

`.docs/planning/research/frameworks-design-templating/08-pack-layout-model.md`

## Current coverage

### TypeScript / JavaScript

- [x] NestJS backend
- [x] React CRUD forms
- [x] TypeORM entities
- [x] Mongoose models
- [x] class-validator DTOs
- [x] Zod schemas
- [x] Joi schemas
- [x] TypeScript API client
- [x] Next API Bridge
- [x] Next.js app
- [x] React Native app

### Dart

- [x] Dart client SDK
- [x] Flutter API Bridge
- [x] Flutter app

### Python

- [x] FastAPI backend
- [x] Pydantic models — implementation present; verification deferred
- [x] SQLAlchemy models — implementation present; verification deferred
- [x] Python Client SDK — implementation present; verification deferred

### Go

- [x] Go Client SDK
- [x] Go net/http backend — implementation present; verification deferred
- [x] GORM entities — implementation present; verification deferred
- [x] Go validator DTOs — implementation present; verification deferred

### Rust

- [x] Axum backend — implementation present; verification deferred
- [x] Rust Client SDK — implementation present; verification deferred
- [x] SeaORM entities — implementation present; verification deferred
- [x] validator DTOs — implementation present; verification deferred

### Java / JVM

- [x] Jakarta Validation DTOs — implementation present; verification deferred
- [x] Java Client SDK — implementation present; verification deferred
- [x] JPA entities — implementation present; verification deferred
- [x] Jakarta REST backend — implementation present; verification deferred

### .NET / C#

- [x] ASP.NET Core backend — implementation present; verification deferred
- [x] C# Client SDK — implementation present; verification deferred
- [x] EF Core entities — implementation present; verification deferred
- [x] FluentValidation DTOs — implementation present; verification deferred

### PHP

- [x] Symfony backend — implementation present; verification deferred
- [x] PHP Client SDK — implementation present; verification deferred
- [x] Doctrine ORM entities — implementation present; verification deferred
- [x] Symfony Validator DTOs — implementation present; verification deferred

### Swift

- [x] Swift Client SDK — implementation present; verification deferred
- [x] Vapor backend — implementation present; verification deferred
- [x] Fluent models — implementation present; verification deferred
- [x] Swift Codable validation — implementation present; verification deferred

### Kotlin

- [x] Kotlin Client SDK — implementation present; verification deferred
- [x] Ktor backend — implementation present; verification deferred
- [x] Exposed tables — implementation present; verification deferred
- [x] Kotlinx validation — implementation present; verification deferred

### Ruby

- [x] Ruby Client SDK — implementation present; verification deferred
- [x] Sinatra backend — implementation present; verification deferred
- [x] Active Record models — implementation present; verification deferred
- [x] dry-validation contracts — implementation present; verification deferred

### Elixir

- [x] Elixir Client SDK — implementation present; verification deferred
- [x] Phoenix backend — implementation present; verification deferred
- [x] Ecto schemas — implementation present; verification deferred
- [x] Ecto changesets — implementation present; verification deferred

### Scala

- [x] http4s backend — implementation present; verification deferred
- [x] Scala Client SDK — implementation present; verification deferred
- [x] Slick tables — implementation present; verification deferred
- [x] Scala Circe validation — implementation present; verification deferred

### Clojure

- [x] Reitit backend — implementation present; verification deferred
- [x] Clojure Client SDK — implementation present; verification deferred
- [x] next.jdbc models — implementation present; verification deferred
- [x] Malli schemas — implementation present; verification deferred

### C++

- [x] C++ Client SDK — implementation present; verification deferred
- [x] Crow backend — implementation present; verification deferred
- [x] sqlite_orm models — implementation present; verification deferred
- [x] C++ validation — implementation present; verification deferred

### Haskell

- [x] Haskell Client SDK — implementation present; verification deferred
- [x] Scotty backend — implementation present; verification deferred
- [x] Persistent models — implementation present; verification deferred
- [x] Haskell validation — implementation present; verification deferred

### Language coverage

- [x] Go — client SDK verified; backend, persistence and validation implemented
- [x] Rust — backend, client, persistence and validation represented
- [x] Java — backend, client, persistence and validation represented
- [x] .NET / C# — backend, client, persistence and validation represented
- [x] Python — backend, client, persistence and validation represented
- [x] Haskell — backend, client, persistence and validation represented
- [x] PHP — backend, client, persistence and validation represented
- [x] Swift — backend, client, persistence and validation represented
- [x] Kotlin — backend, client, persistence and validation represented
- [x] Ruby — backend, client, persistence and validation represented
- [x] Elixir — backend, client, persistence and validation represented
- [x] C++ — backend, client, persistence and validation represented
- [x] Scala — backend, client, persistence and validation represented
- [x] Clojure — backend, client, persistence and validation represented
- [ ] Plain C — research-only; no baseline approved

### Cross-ecosystem validation

- [x] JSON Schema 2020-12 — `package/validation/json-schema`; verification deferred

### Documentation / contracts

- [x] Markdown Reference — `inject/documentation/markdown-reference`; verification deferred
- [x] OpenAPI 3.1 — `package/documentation/openapi`; verification deferred

### Testing

- [x] Schema Examples — `inject/testing/schema-examples`; verification deferred
- [x] Postman Collection — `package/testing/postman-collection`; verification deferred
- [x] Bruno Collection — `package/testing/bruno-collection`; verification deferred
- [x] HTTP Smoke Tests — `package/testing/http-smoke-tests`; verification deferred
- [x] k6 Smoke Tests — `package/testing/k6-smoke-tests`; verification deferred

### Backend projects

- [x] NestJS Application — `project/backend/nestjs-app`; verification deferred

## Ecosystem research

- [x] [00 — Current audit](ecosystems/00-audit.md)
- [ ] [01 — Go](ecosystems/01-go.md)
- [ ] [02 — Rust](ecosystems/02-rust.md)
- [ ] [03 — Java / JVM](ecosystems/03-java-jvm.md)
- [ ] [04 — .NET / C#](ecosystems/04-dotnet.md)
- [ ] [05 — Python](ecosystems/05-python.md)
- [ ] [06 — TypeScript / JavaScript](ecosystems/06-typescript-javascript.md)
- [ ] [07 — Dart / Flutter](ecosystems/07-dart-flutter.md)
- [ ] [08 — PHP](ecosystems/08-php.md)
- [ ] [09 — Swift](ecosystems/09-swift.md)
- [ ] [10 — Kotlin](ecosystems/10-kotlin.md)
- [ ] [11 — Ruby](ecosystems/11-ruby.md)
- [ ] [12 — Elixir](ecosystems/12-elixir.md)
- [ ] [13 — C / C++](ecosystems/13-c-cpp.md)
- [ ] [14 — Cross-ecosystem candidates](ecosystems/14-cross-ecosystem.md)
- [ ] [15 — Other languages](ecosystems/15-other-languages.md)

## Current next step

Do the scheduled `inject | unit` layout refactor as soon as the Dryv `dryv.pack/v1alpha1` contract supports it. Until then, limit work to pack fixes, verification and research that does not deepen the obsolete `package | project` distinction.

After the migration, resume ecosystem expansion and broader generated-testing work.
