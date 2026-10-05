# Ecosystem coverage audit

Status: living coverage audit.

This document records the public-pack coverage visible on `develop`. The numbered ecosystem documents are navigation aids, not implementation priority.

## Current catalog

The repository currently contains **51 pack manifests**.

### Inject

Backend:

- [x] `inject/backend/nestjs-backend`

Frontend:

- [x] `inject/frontend/react-crud-forms`

Persistence:

- [x] `inject/persistence/typeorm-entities`
- [x] `inject/persistence/mongoose-models`

Validation:

- [x] `inject/validation/class-validator-dtos`
- [x] `inject/validation/zod-schemas`
- [x] `inject/validation/joi-schemas`

### Package

Backend:

- [x] `package/backend/fastapi-backend`
- [x] `package/backend/axum-backend`
- [x] `package/backend/jakarta-rest-backend`
- [x] `package/backend/go-net-http-backend`
- [x] `package/backend/aspnet-core-backend`
- [x] `package/backend/symfony-backend`
- [x] `package/backend/vapor-backend`
- [x] `package/backend/ktor-backend`

Persistence:

- [x] `package/persistence/seaorm-entities`
- [x] `package/persistence/jpa-entities`
- [x] `package/persistence/gorm-entities`
- [x] `package/persistence/ef-core-entities`
- [x] `package/persistence/sqlalchemy-models`
- [x] `package/persistence/doctrine-orm-entities`
- [x] `package/persistence/fluent-models`
- [x] `package/persistence/exposed-tables`

Validation:

- [x] `package/validation/jakarta-validation-dtos`
- [x] `package/validation/validator-dtos`
- [x] `package/validation/go-validator-dtos`
- [x] `package/validation/fluentvalidation-dtos`
- [x] `package/validation/pydantic-models`
- [x] `package/validation/symfony-validator-dtos`
- [x] `package/validation/swift-codable-validation`
- [x] `package/validation/kotlinx-validation`

Clients:

- [x] `package/clients/dart-client-sdk`
- [x] `package/clients/flutter-api-bridge`
- [x] `package/clients/next-api-bridge`
- [x] `package/clients/ts-api-client`
- [x] `package/clients/go-client-sdk`
- [x] `package/clients/rust-client-sdk`
- [x] `package/clients/java-client-sdk`
- [x] `package/clients/csharp-client-sdk`
- [x] `package/clients/python-client-sdk`
- [x] `package/clients/php-client-sdk`
- [x] `package/clients/swift-client-sdk`
- [x] `package/clients/kotlin-client-sdk`

### Project

Frontend:

- [x] `project/frontend/nextjs-app`
- [x] `project/frontend/flutter-app`
- [x] `project/frontend/react-native-app`

## Language-family baseline coverage

A baseline means backend + API client + persistence + validation are represented, not that every framework or project type is covered.

- [x] TypeScript / JavaScript — mature multi-purpose coverage plus frontend projects
- [x] Python — FastAPI, HTTPX, SQLAlchemy, Pydantic
- [x] Go — net/http, client SDK, GORM, validator
- [x] Rust — Axum, reqwest, SeaORM, validator
- [x] Java / JVM — Jakarta REST, HttpClient, JPA, Jakarta Validation
- [x] .NET / C# — ASP.NET Core, HttpClient, EF Core, FluentValidation
- [x] PHP — Symfony, Guzzle, Doctrine ORM, Symfony Validator
- [x] Swift — Vapor, URLSession, Fluent, Codable validation
- [x] Kotlin — Ktor, Ktor Client, Exposed, generated validation
- [x] Ruby — Sinatra, Net::HTTP, Active Record, dry-validation
- [ ] Elixir
- [ ] C / C++

Dart/Flutter is represented strongly for clients and frontend projects, but is not treated as a server/persistence baseline.

## Proven pack patterns to reuse

- SQL persistence → `typeorm-entities`, `seaorm-entities`, `jpa-entities`, `gorm-entities`, `ef-core-entities`, `sqlalchemy-models`, `doctrine-orm-entities`, `fluent-models`, `exposed-tables`, `active-record-models`
- document persistence → `mongoose-models`
- validation DTOs/models → `class-validator-dtos`, `jakarta-validation-dtos`, `validator-dtos`, `go-validator-dtos`, `fluentvalidation-dtos`, `pydantic-models`, `symfony-validator-dtos`, `swift-codable-validation`, `kotlinx-validation`, `dry-validation-contracts`
- schema validation → `zod-schemas`, `joi-schemas`
- HTTP backends → `fastapi-backend`, `nestjs-backend`, `axum-backend`, `jakarta-rest-backend`, `go-net-http-backend`, `aspnet-core-backend`, `symfony-backend`, `vapor-backend`, `ktor-backend`, `sinatra-backend`
- HTTP SDKs → `ts-api-client`, `dart-client-sdk`, `go-client-sdk`, `rust-client-sdk`, `java-client-sdk`, `csharp-client-sdk`, `python-client-sdk`, `php-client-sdk`, `swift-client-sdk`, `kotlin-client-sdk`, `ruby-client-sdk`
- existing-project UI → `react-crud-forms`
- complete frontend app → `nextjs-app`, `flutter-app`, `react-native-app`
- framework bridge client → `next-api-bridge`, `flutter-api-bridge`

## Current thin areas

- Elixir and C/C++ baseline coverage
- backend/project application packs
- explicit backend project composition capability contracts
- multipart/file semantics
- streaming semantics
- auth/security generation contracts
- cross-language contract/documentation packs
- additional UI ecosystems and native/mobile application packs
- database migration/schema packs for defaults, checks and target-specific DDL semantics that ORMs cannot express portably

## Audit checklist for future candidates

Before implementation:

- [ ] identify the closest existing Dryv pack
- [ ] decide `inject`, `package` or `project`
- [ ] define purpose, language and framework/library
- [ ] define realistic generated artifacts
- [ ] define selections
- [ ] define `provides`
- [ ] define `needs`
- [ ] confirm imports/exports relationships
- [ ] choose the simplest adequate renderer
- [ ] list real runtime/dev dependencies
- [ ] design a realistic shared-fixture/toolchain check
- [ ] inspect whether current derived context is sufficient
- [ ] record any context/Engine gap separately
- [ ] confirm no framework-specific meaning is being pushed into Runtime IR
- [ ] confirm no hidden coupling by folder name, pack name, install order or generated path
- [ ] keep reusable exact assets under `shared/`

## Context already proven useful

Existing packs consume semantic facts for:

- schemas, fields and schema roles
- primitives, enums, temporals, records and nested schemas
- optionality, nullability and arrays
- ranges, lengths, patterns, numeric precision and formats
- defaults and generated values
- storage names, namespaces, primary keys and indexes
- relations and delete/update behavior
- invariants
- HTTP methods and paths
- path/query/query-object/header/cookie/body/form bindings
- operation inputs and outputs
- response status information
- groups and features
- generated symbols
- file dependencies and dependency groups
- capability bindings

Future packs should translate these semantic facts into target-library syntax rather than request target-specific Runtime IR fields.
