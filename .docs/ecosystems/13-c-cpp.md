# C / C++ ecosystem

Status: C++ client, Crow backend, sqlite_orm persistence and generated validation packs are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance. Plain C remains research-only.

This ecosystem should be treated carefully because framework conventions, dependency management and ownership patterns vary widely.

## Coverage

- [ ] C client SDK research
- [x] C++ client SDK
- [x] C++ backend pack
- [x] C++ persistence pack
- [x] C++ schema/validation pack
- [ ] project pack

## Client SDKs

- [x] `unit/clients/cpp-client-sdk` — implementation present; verification deferred
- [x] cpr 1.14 client baseline selected
- [ ] cpr-backed transport research
- [ ] cpp-httplib client research
- [ ] JSON library choice audit (nlohmann/json or alternative)
- [x] generated structs/classes and canonical enum wrappers
- [x] path/query/query-object/body/header/cookie/form bindings
- [x] typed output decoding
- [x] generated `Result<T>` + `ApiError` strategy
- [x] CMake package metadata

- [ ] C client SDK feasibility audit
- [ ] libcurl transport
- [ ] generated plain structs/enums
- [ ] ownership/allocation policy
- [ ] JSON parser/library strategy

Models:

- `ts-api-client`
- `dart-client-sdk`

## Backends

- [x] `unit/backend/crow-backend` — Crow 1.3.4 implementation present; verification deferred
- [ ] Drogon backend
- [ ] oat++ backend
- [ ] Pistache research
- [ ] cpp-httplib server research
- [x] generated routing separated from business service interfaces
- [x] path/query/query-object/body/header/cookie/form binding
- [x] output/status mapping
- [x] feature/group organization

Primary model: `fastapi-backend`.

## Persistence

- [ ] SOCI models/integration research
- [x] `unit/persistence/sqlite-orm-models` — sqlite_orm 1.9.1 implementation present; verification deferred
- [ ] ODB research
- [ ] Drogon ORM research
- [x] primary/generated keys
- [x] indexes/uniqueness
- [x] relations
- [x] nullability
- [ ] defaults/check expressions
- [x] enum/temporal/decimal mapping

Primary model: `typeorm-entities`.

## Validation/schema

- [x] `unit/validation/cpp-validation` — generated model validation helpers present; verification deferred
- [ ] Boost validation-related ecosystem research
- [x] runtime validation with structured `ValidationResult`
- [x] ranges/lengths/patterns/formats
- [x] nested/collection validation
- [x] simple non-arithmetic invariants

## Projects

- [ ] CMake HTTP API project
- [ ] Crow API project
- [ ] Drogon API project
- [ ] package manager research: Conan/vcpkg/system dependencies
- [ ] realistic compile/test fixture

## Other C/C++ candidates

- [ ] gRPC C++ research
- [ ] protobuf model/client/server pack research
- [ ] OpenTelemetry integration
- [ ] CLI project research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [x] ownership/allocation behavior stays target-specific
- [x] C ABI constraints do not affect Runtime IR
