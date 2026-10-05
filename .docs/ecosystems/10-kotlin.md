# Kotlin ecosystem

Status: candidate backlog only. No implementation is approved by this file.

Kotlin shares the JVM with Java but has enough distinct framework/client/mobile conventions to track separately.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation/schema pack
- [ ] API client SDK
- [ ] Android/Multiplatform project pack

## Backends

- [ ] Ktor backend
- [ ] Spring Boot Kotlin backend
- [ ] http4k research
- [ ] generated routes/controllers separated from business services
- [ ] path/query/body/header binding
- [ ] typed response/status mapping
- [ ] coroutine-first service interfaces
- [ ] validation composition

Models:

- `fastapi-backend`
- `nestjs-backend`

## Persistence

- [ ] Exposed ORM/SQL models
- [ ] JPA/Hibernate Kotlin entities
- [ ] Spring Data Kotlin integration
- [ ] KMongo research
- [ ] primary/generated keys
- [ ] indexes/uniqueness
- [ ] relations
- [ ] nullable/default fields
- [ ] enums
- [ ] temporal/decimal mapping

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] Jakarta Validation Kotlin DTOs
- [ ] Konform research
- [ ] Valiktor research
- [ ] kotlinx.serialization model package
- [ ] nested/collection validation
- [ ] enum/range/length/pattern mapping
- [ ] simple invariants

## Client SDKs

- [ ] `package/clients/kotlin-client-sdk`
- [ ] Ktor Client transport
- [ ] kotlinx.serialization
- [ ] typed operations
- [ ] path/query/body bindings
- [ ] response decoding
- [ ] Retrofit alternative research
- [ ] provide operation/type/enum capabilities

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

## Other Kotlin candidates

- [ ] GraphQL Kotlin research
- [ ] gRPC Kotlin research
- [ ] coroutine Flow client adapters
- [ ] OpenTelemetry integration

## Context questions to verify

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] generic/container outputs
- [ ] mobile view semantics
