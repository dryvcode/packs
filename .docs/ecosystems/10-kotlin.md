# Kotlin ecosystem

Status: Ktor backend, Exposed persistence, generated Kotlin validation and Ktor Client SDK are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

Kotlin shares the JVM with Java but has enough distinct framework, coroutine and serialization conventions to remain a separate ecosystem.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation/schema pack
- [x] API client SDK
- [ ] Android/Multiplatform project pack

## Backends

- [x] `unit/backend/ktor-backend` — implementation present; verification deferred
- [ ] Spring Boot Kotlin backend
- [ ] http4k research
- [x] generated routes separated from business services
- [x] path/query/query-object/body/header/cookie/form binding
- [x] typed response/status mapping
- [x] coroutine-first service interfaces
- [ ] validation capability composition

Primary models:

- `fastapi-backend`
- `axum-backend`

## Persistence

- [x] `unit/persistence/exposed-tables` — implementation present; verification deferred
- [ ] JPA/Hibernate Kotlin entities
- [ ] Spring Data Kotlin integration
- [ ] KMongo research
- [x] primary/generated keys
- [x] indexes/uniqueness
- [x] real scalar foreign-key constraints through Exposed references
- [x] nullable fields
- [x] arbitrary enum values via JSON storage
- [x] temporal/decimal mapping
- [x] relation delete/update actions
- [ ] portable defaults/check expressions/create-only enforcement

The Exposed package is driver-neutral: consuming projects choose JDBC or R2DBC.

## Validation/schema

- [x] `unit/validation/kotlinx-validation` — implementation present; verification deferred
- [ ] Jakarta Validation Kotlin DTO alternative
- [ ] Konform research
- [ ] Valiktor research
- [x] kotlinx.serialization model package
- [x] nested/collection validation
- [x] enum/range/length/pattern mapping
- [x] common formats
- [x] conservative simple invariants
- [ ] arithmetic/structural invariant lowering

## Client SDKs

- [x] `unit/clients/kotlin-client-sdk` — implementation present; verification deferred
- [x] Ktor Client transport
- [x] kotlinx.serialization
- [x] typed coroutine operations
- [x] path/query/query-object/body/header/cookie/form bindings
- [x] typed response decoding
- [x] structured API errors
- [ ] Retrofit alternative research

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

## Android / Multiplatform

- [ ] Android Jetpack Compose app research
- [ ] Compose CRUD forms/components
- [ ] Kotlin Multiplatform client package
- [ ] Kotlin Multiplatform app research
- [ ] operation state/view-model generation research
- [ ] compose generated client/types through explicit bindings

## Projects

- [ ] Ktor API project
- [ ] Spring Boot Kotlin project
- [ ] Android Compose project
- [ ] Kotlin Multiplatform project

Project composition remains blocked on explicit server/project capability contracts rather than hidden generated-path coupling.

## Other Kotlin candidates

- [ ] GraphQL Kotlin research
- [ ] gRPC Kotlin research
- [ ] coroutine Flow client adapters
- [ ] OpenTelemetry integration

## Context questions

- [x] headers/cookies
- [x] query-object/form bindings
- [x] generic/container wire values have explicit JsonElement fallbacks
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] mobile view semantics
