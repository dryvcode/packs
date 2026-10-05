# C / C++ ecosystem

Status: candidate backlog only. No implementation is approved by this file.

This ecosystem should be treated carefully because framework conventions, dependency management and ownership patterns vary widely.

## Coverage

- [ ] C client SDK research
- [ ] C++ client SDK
- [ ] C++ backend pack
- [ ] C++ persistence pack
- [ ] C++ schema/validation pack
- [ ] project pack

## Client SDKs

- [ ] `package/clients/cpp-client-sdk`
- [ ] standard library + libcurl baseline research
- [ ] cpr-backed transport research
- [ ] cpp-httplib client research
- [ ] JSON library choice audit (nlohmann/json or alternative)
- [ ] generated structs/classes and enums
- [ ] path/query/body bindings
- [ ] typed output decoding
- [ ] error/result strategy
- [ ] CMake package fixture

- [ ] C client SDK feasibility audit
- [ ] libcurl transport
- [ ] generated plain structs/enums
- [ ] ownership/allocation policy
- [ ] JSON parser/library strategy

Models:

- `ts-api-client`
- `dart-client-sdk`

## Backends

- [ ] Crow backend
- [ ] Drogon backend
- [ ] oat++ backend
- [ ] Pistache research
- [ ] cpp-httplib server research
- [ ] generated routing separated from business interfaces
- [ ] path/query/body binding
- [ ] output/status mapping
- [ ] feature/group organization

Primary model: `fastapi-backend`.

## Persistence

- [ ] SOCI models/integration research
- [ ] sqlite_orm research
- [ ] ODB research
- [ ] Drogon ORM research
- [ ] primary/generated keys
- [ ] indexes/uniqueness
- [ ] relations
- [ ] nullability/defaults
- [ ] enum/temporal/decimal mapping

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] generated model validation helpers
- [ ] Boost validation-related ecosystem research
- [ ] compile-time vs runtime validation strategy
- [ ] ranges/lengths/patterns/formats
- [ ] nested/collection validation
- [ ] simple invariants

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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] ownership/allocation behavior should stay target-specific
- [ ] C ABI constraints should not affect Runtime IR
