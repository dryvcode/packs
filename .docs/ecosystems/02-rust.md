# Rust ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation/schema pack
- [ ] API client SDK
- [ ] project pack

## Backends

- [ ] Axum backend
- [ ] Actix Web backend
- [ ] Rocket backend
- [ ] Poem backend
- [ ] compare package layout against inject layout for existing Rust workspaces
- [ ] generate service traits separate from routing
- [ ] map path/query/body bindings to extractors
- [ ] map outputs/statuses into responses
- [ ] organize routers by feature/group
- [ ] generate model/enums only when the backend owns those types
- [ ] compose with validation/persistence packs where practical

Best initial structural model: `fastapi-backend`.

## Persistence

- [ ] Diesel models/schema integration
- [ ] SeaORM entities
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

- [ ] serde-based generated schema models
- [ ] validator crate integration
- [ ] garde integration
- [ ] nested model validation
- [ ] enum validation
- [ ] optional/null distinction strategy
- [ ] collection constraints
- [ ] length/range/pattern mappings
- [ ] UUID/URL/email and other format mappings
- [ ] cross-field invariant strategy

Models:

- `class-validator-dtos`
- `zod-schemas`

## Client SDKs

- [ ] `package/clients/rust-client-sdk`
- [ ] reqwest transport
- [ ] serde models
- [ ] typed enums
- [ ] feature clients
- [ ] path/query/body bindings
- [ ] response decoding
- [ ] typed error surface
- [ ] async runtime choice and dependency implications
- [ ] provide `operation.client`, `schema.types`, `property.enum.types`

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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] security/auth
- [ ] generic type representation
- [ ] ownership/lifetime concerns should remain target-code concerns, not Runtime IR concepts

Framework-specific Rust concepts must stay inside the pack.
