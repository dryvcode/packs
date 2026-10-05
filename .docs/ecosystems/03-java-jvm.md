# Java / JVM ecosystem

Status: Jakarta Validation DTOs, Java HttpClient SDK and portable JPA entities are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

This file covers Java-first JVM packs. Kotlin-specific packs are tracked separately.

## Coverage

- [ ] backend pack
- [x] persistence pack
- [x] validation pack
- [x] API client SDK
- [ ] project pack

## Validation

- [x] `package/validation/jakarta-validation-dtos` — implementation present; verification deferred
  - generate Java records/classes or DTO classes
  - generate enums
  - map required/nullability semantics
  - map size/range/pattern constraints
  - map common formats
  - nested validation with `@Valid`
  - collection element validation
  - custom constraint strategy for simple invariants
  - provide `schema.validation`, `schema.types`, `property.enum.types`
  - Maven or Gradle fixture using a real Validator

- [ ] Hibernate Validator-specific enhancements where portable Jakarta annotations are insufficient

Primary model: `class-validator-dtos`.

## Backends

- [ ] Spring Boot MVC backend
- [ ] Spring WebFlux backend research
- [ ] Micronaut backend
- [ ] Quarkus REST backend
- [ ] Javalin backend
- [ ] Helidon backend
- [ ] Jakarta REST / JAX-RS backend
- [ ] generated controller/resource layer separated from business services
- [ ] request DTO binding
- [ ] path/query/body/header mapping
- [ ] response/status mapping
- [ ] feature/group organization
- [ ] dependency injection boundaries
- [ ] validation capability composition

Models:

- `nestjs-backend`
- `fastapi-backend`

## Persistence

- [x] `package/persistence/jpa-entities` — portable JPA implementation present; verification deferred
- [ ] Spring Data JPA integration
- [ ] EclipseLink/JPA portability research
- [ ] jOOQ-oriented models/integration
- [ ] MyBatis mapper/model research
- [ ] primary/generated key mappings
- [ ] table/schema/catalog naming
- [ ] indexes and uniqueness
- [ ] relationships and cascade/delete semantics
- [ ] enums
- [ ] temporal types
- [ ] BigDecimal/money
- [ ] embedded/value objects
- [ ] simple check constraints where target supports them

Primary model: `typeorm-entities`.

## Client SDKs

- [x] `package/clients/java-client-sdk` — implementation present; verification deferred
- [ ] Java `HttpClient` baseline
- [ ] Jackson models
- [ ] typed operations
- [ ] path/query/body binding
- [ ] typed outputs
- [ ] error model
- [ ] provide operation/type/enum capability slots
- [ ] Retrofit-based alternative research
- [ ] OpenFeign-oriented client research

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] Spring Boot API project
- [ ] Micronaut API project
- [ ] Quarkus API project
- [ ] Javalin API project
- [ ] Maven project layout
- [ ] Gradle project layout
- [ ] compose validation and persistence packs explicitly
- [ ] application configuration scaffolding
- [ ] real integration test fixture

## Other JVM candidates

- [ ] GraphQL Java / Spring GraphQL research
- [ ] Kafka producer/consumer pack research
- [ ] gRPC Java research
- [ ] MapStruct mapping pack research
- [ ] Jackson serialization configuration research
- [ ] OpenTelemetry integration research

## Context questions to verify before implementation

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] security/auth
- [ ] generic/container output types
- [ ] annotation targets for nested/container validation

Do not add Runtime IR fields such as Java annotations, Spring mappings or Hibernate column types.
