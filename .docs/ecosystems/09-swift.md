# Swift ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] API client SDK
- [ ] backend pack
- [ ] persistence pack
- [ ] model/validation pack
- [ ] application pack

## Client SDKs

- [ ] `package/clients/swift-client-sdk`
- [ ] URLSession baseline transport
- [ ] Codable models and enums
- [ ] typed operations
- [ ] path/query/body bindings
- [ ] typed output decoding
- [ ] structured API errors
- [ ] async/await
- [ ] Alamofire-backed alternative research
- [ ] provide `operation.client`, `schema.types`, `property.enum.types`

Models:

- `ts-api-client`
- `dart-client-sdk`

## Models and validation

- [ ] standalone Codable model package
- [ ] generated validation helpers from Dryv constraints
- [ ] enum/raw-value strategy
- [ ] optional/null handling
- [ ] date/time strategy
- [ ] decimal/money strategy
- [ ] nested model validation
- [ ] cross-field invariant strategy

## Backend

- [ ] Vapor backend
- [ ] Hummingbird backend research
- [ ] generated routes separated from services
- [ ] request/response Codable models
- [ ] path/query/body binding
- [ ] status mapping
- [ ] feature grouping

Primary model: `fastapi-backend`.

## Persistence

- [ ] Vapor Fluent models
- [ ] GRDB research
- [ ] primary/generated identifiers
- [ ] relations
- [ ] indexes
- [ ] nullability/defaults
- [ ] enums and temporal mappings

Primary model: `typeorm-entities`.

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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] UI view semantics before SwiftUI project generation
