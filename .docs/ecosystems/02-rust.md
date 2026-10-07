# Rust ecosystem

Status: Axum backend, reqwest client SDK, SeaORM entities and validator DTOs are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation/schema pack
- [x] API client SDK
- [ ] project pack

## Backends

- [x] `unit/backend/axum-backend` — implementation present; verification deferred
- [ ] Actix Web backend
- [ ] Rocket backend
- [ ] Poem backend
- [ ] compare unit ownership against inject contribution for existing Rust workspaces
- [ ] generate service traits separate from routing
- [ ] map path/query/body bindings to extractors
- [ ] map outputs/statuses into responses
- [ ] organize routers by feature/group
- [ ] generate model/enums only when the backend owns those types
- [ ] compose with validation/persistence packs where practical

Best initial structural model: `fastapi-backend`.

## Persistence

- [ ] Diesel models/schema integration
- [x] `unit/persistence/seaorm-entities` — implementation present; verification deferred
- [ ] SQLx models
- [ ] evaluate rbatis as a later ecosystem candidate
- [ ] map storage names and namespaces
- [ ] primary/generated keys
- [ ] indexes/uniqueness
- [ ] relations
- [ ] nullability/defaults
- [ ] enum mapping
- [ ] temporal mapping
- [ ] decimal/money mapping
- [ ] database invariants/checks where supported

Primary model: `typeorm-entities`.

## Validation and schema types

- [x] `unit/validation/validator-dtos` — serde schema models + validator derive; verification deferred
- [x] validator crate integration
- [ ] garde integration
- [x] nested model validation
- [x] enum validation through serde canonical-value decoding
- [x] optional/null distinction strategy documented, including plain Option limitation
- [x] collection cardinality constraints; primitive element constraints documented as a gap
- [x] length/range/pattern mappings
- [x] UUID/URL/email and selected format mappings
- [ ] cross-field invariant strategy

Models:

- `class-validator-dtos`
- `zod-schemas`

## Client SDKs

- [x] `unit/clients/rust-client-sdk` — implementation present; verification deferred
- [x] reqwest transport
- [x] serde models
- [x] typed enums with canonical wire values
- [ ] feature clients
- [x] path/query/query-object/header/cookie/body/form bindings
- [x] response decoding
- [x] typed error surface
- [ ] async runtime choice and dependency implications
- [x] provide `operation.client`, `schema.types`, `property.enum.types`

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] Axum API project
- [ ] Actix Web API project
- [ ] Rocket API project
- [ ] workspace/library layout research
- [ ] compose persistence and validation rather than embedding copies
- [ ] realistic configuration, entrypoint and tests

## Other Rust candidates

- [ ] tonic gRPC client/server research
- [ ] async-graphql research
- [ ] tracing/OpenTelemetry integration research
- [ ] clap CLI project/component research
- [ ] WASM client/type package research

## Context questions to verify before implementation

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] security/auth
- [ ] generic type representation
- [ ] ownership/lifetime concerns should remain target-code concerns, not Runtime IR concepts

Framework-specific Rust concepts must stay inside the pack.
