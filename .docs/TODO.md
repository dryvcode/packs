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

### Language coverage

- [x] Go — client SDK verified; backend, persistence and validation implemented
- [x] Rust — backend, client, persistence and validation represented
- [x] Java — backend, client, persistence and validation represented
- [x] .NET / C# — backend, client, persistence and validation represented
- [x] Python — backend, client, persistence and validation represented
- [x] PHP — backend, client, persistence and validation represented
- [ ] PHP
- [ ] Swift
- [ ] Kotlin-specific ecosystem
- [ ] Ruby
- [ ] Elixir
- [ ] C / C++

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

The multi-language expansion batch is implemented on `develop`:

- Go client + standard-library backend;
- Rust Axum backend + reqwest client + SeaORM persistence + validator DTOs;
- Java Jakarta REST backend + HttpClient SDK + JPA persistence + Jakarta Validation DTOs.

Runtime/toolchain verification remains deferred while the Dryv Engine is under maintenance. Next implementation work should target remaining ecosystem gaps rather than duplicating these baselines.
