# Swift ecosystem

Status: Swift URLSession client, standalone Codable validation, Vapor backend and Fluent persistence packs are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] API client SDK
- [x] backend pack
- [x] persistence pack
- [x] model/validation pack
- [ ] application pack

## Client SDKs

- [x] `unit/clients/swift-client-sdk` — implementation present; verification deferred
- [x] URLSession baseline transport
- [x] Codable models and canonical enum wrappers
- [x] typed async operations
- [x] path/query/query-object/body/header/cookie/form bindings
- [x] typed output decoding
- [x] structured API errors
- [x] async/await
- [ ] Alamofire-backed alternative research
- [x] provide `operation.client`, `schema.types`, `property.enum.types`

Models:

- `ts-api-client`
- `dart-client-sdk`

## Models and validation

- [x] `unit/validation/swift-codable-validation`
- [x] standalone Codable model package
- [x] generated validation helpers from Dryv constraints
- [x] canonical scalar enum-wrapper strategy
- [x] required-nullable presence preserved during Codable decoding
- [x] optional omitted-vs-explicit-null limitation documented
- [x] temporal wire values stay strings unless stronger neutral semantics exist
- [x] decimal/money use `Decimal` in wire models
- [x] nested model validation
- [x] simple non-null cross-field invariants
- [ ] optional/null-dependent or arithmetic invariant lowering

## Backend

- [x] `unit/backend/vapor-backend` — implementation present; verification deferred
- [ ] Hummingbird backend research
- [x] generated routes separated from service protocols
- [x] request/response Codable models
- [x] path/query/query-object/body/header/cookie/form binding
- [x] declared success-status mapping
- [x] feature grouping

Primary model: `fastapi-backend`.

## Persistence

- [x] `unit/persistence/fluent-models` — implementation present; verification deferred
- [ ] GRDB research
- [x] single/composite primary identifiers
- [x] system integer and UUID identifier strategies
- [x] scalar foreign-key constraints and lifecycle actions in migrations
- [x] storage namespaces via Fluent schema spaces
- [x] unique constraints
- [ ] portable non-unique indexes — Fluent has no target-neutral builder
- [x] nullability
- [ ] defaults/checks/create-only enforcement
- [x] enum/structural values use JSON storage
- [x] decimal/money exact-string persistence mapping
- [x] temporal mappings where Fluent has portable schema types

Primary model: `typeorm`.

## Apps/projects

- [ ] Swift package SDK project
- [ ] Vapor API project
- [ ] SwiftUI application research
- [ ] SwiftUI CRUD form/component research
- [ ] compose generated client SDK with SwiftUI app explicitly

## Other Swift candidates

- [ ] Combine-based client adapters research
- [ ] GraphQL client research
- [ ] gRPC Swift research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] UI view semantics before SwiftUI project generation
