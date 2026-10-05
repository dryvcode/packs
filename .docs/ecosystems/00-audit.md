# Ecosystem coverage audit

Status: living coverage audit.

This document records the living public-pack coverage visible on `develop`.

The numbering in this folder is only for navigation. It does not establish implementation order.

## Current packs

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
- [x] `package/backend/axum-backend` — verification deferred
- [x] `package/backend/jakarta-rest-backend` — verification deferred
- [x] `package/backend/go-net-http-backend` — verification deferred

Persistence:

- [x] `package/persistence/seaorm-entities` — verification deferred
- [x] `package/persistence/jpa-entities` — verification deferred

Validation:

- [x] `package/validation/jakarta-validation-dtos` — verification deferred
- [x] `package/validation/validator-dtos` — verification deferred

Clients:

- [x] `package/clients/dart-client-sdk`
- [x] `package/clients/flutter-api-bridge`
- [x] `package/clients/next-api-bridge`
- [x] `package/clients/ts-api-client`
- [x] `package/clients/go-client-sdk`
- [x] `package/clients/rust-client-sdk` — verification deferred
- [x] `package/clients/java-client-sdk` — verification deferred

### Project

Frontend:

- [x] `project/frontend/nextjs-app`
- [x] `project/frontend/flutter-app`
- [x] `project/frontend/react-native-app`

## Coverage summary

Generated-language families currently represented:

- [x] TypeScript / JavaScript
- [x] Python
- [x] Dart
- [x] Go — client SDK verified; standard-library backend implemented; persistence/validation still absent
- [x] Rust — backend, client, persistence and validation represented; verification deferred for new packs
- [x] Java — backend, client, persistence and validation represented; verification deferred
- [x] .NET / C# — backend, client, persistence and validation represented; verification deferred
- [ ] C#
- [ ] PHP
- [ ] Swift
- [ ] Kotlin-specific stacks
- [ ] Ruby
- [ ] Elixir
- [ ] C / C++

Strongest current areas:

- TypeScript validation
- TypeScript persistence
- TypeScript and Dart API clients
- TypeScript/Dart frontend projects

Thin or absent areas:

- Python persistence and standalone validation
- Go persistence and validation
- Python persistence and standalone validation
- Rust project packs and additional framework alternatives
- Java/JVM project packs and additional framework alternatives
- .NET project/UI packs and additional framework alternatives
- .NET server/persistence/validation/client ecosystem
- PHP, Swift, Ruby and Elixir
- backend project packs
- cross-language contract/documentation packs

## Proven pack patterns to reuse

- SQL ORM/persistence → `typeorm-entities`, `seaorm-entities`, `jpa-entities`, `gorm-entities`, `ef-core-entities`
- document persistence → `mongoose-models`
- validation DTOs → `class-validator-dtos`, `jakarta-validation-dtos`, `validator-dtos`, `go-validator-dtos`, `fluentvalidation-dtos`
- schema validation → `zod-schemas`, `joi-schemas`
- HTTP backend → `fastapi-backend`, `nestjs-backend`, `axum-backend`, `jakarta-rest-backend`, `go-net-http-backend`, `aspnet-core-backend`
- HTTP SDK → `ts-api-client`, `dart-client-sdk`, `go-client-sdk`, `rust-client-sdk`, `java-client-sdk`, `csharp-client-sdk`
- existing-project UI → `react-crud-forms`
- complete frontend app → `nextjs-app`, `flutter-app`, `react-native-app`
- framework bridge client → `next-api-bridge`, `flutter-api-bridge`

## Audit checklist for every future candidate

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
- [ ] design a real fixture and toolchain check
- [ ] inspect whether current derived context is sufficient
- [ ] record any context/Engine gap separately
- [ ] confirm no framework-specific meaning is being pushed into Runtime IR
- [ ] confirm no hidden coupling by folder name, pack name, install order or generated path
- [ ] get owner approval before implementation

## Context already proven useful by existing packs

Existing packs already consume semantic facts for:

- schemas, fields and schema roles
- primitives, enums, temporals, records and nested schemas
- optionality, nullability and arrays
- ranges, lengths, patterns, numeric precision and formats
- defaults and generated values
- storage names, namespaces, primary keys and indexes
- relations and delete behavior
- invariants
- HTTP methods and paths
- path/query/query-object/header/cookie/body/form bindings
- operation inputs and outputs
- response status information
- groups and features
- generated symbols
- file dependencies and dependency groups
- capability bindings

Future packs should translate these semantic facts into target-framework syntax rather than requesting target-specific Runtime IR fields.
