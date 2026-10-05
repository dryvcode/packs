# Ecosystem coverage audit

Status: planning only.

This document records the public-pack coverage visible on `develop` before the ecosystem expansion work starts.

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

Clients:

- [x] `package/clients/dart-client-sdk`
- [x] `package/clients/flutter-api-bridge`
- [x] `package/clients/next-api-bridge`
- [x] `package/clients/ts-api-client`

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
- [ ] Go
- [ ] Rust
- [ ] Java
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
- non-TypeScript persistence
- non-TypeScript validation
- Go server/client ecosystem
- Rust server/client ecosystem
- Java/JVM server/persistence/validation/client ecosystem
- .NET server/persistence/validation/client ecosystem
- PHP, Swift, Ruby and Elixir
- backend project packs
- cross-language contract/documentation packs

## Proven pack patterns to reuse

- SQL ORM/persistence → `typeorm-entities`
- document persistence → `mongoose-models`
- validation DTOs → `class-validator-dtos`
- schema validation → `zod-schemas`, `joi-schemas`
- HTTP backend → `fastapi-backend`, `nestjs-backend`
- HTTP SDK → `ts-api-client`, `dart-client-sdk`
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
- path/query/body bindings
- operation inputs and outputs
- response status information
- groups and features
- generated symbols
- file dependencies and dependency groups
- capability bindings

Future packs should translate these semantic facts into target-framework syntax rather than requesting target-specific Runtime IR fields.
