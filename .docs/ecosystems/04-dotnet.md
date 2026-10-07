# .NET / C# ecosystem

Status: ASP.NET Core backend, EF Core persistence, FluentValidation DTOs and HttpClient SDK are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation pack
- [x] API client SDK
- [ ] frontend/application pack

## Backends

- [ ] ASP.NET Core controllers backend
- [x] `unit/backend/aspnet-core-backend` — endpoint-registration implementation present; verification deferred
- [ ] FastEndpoints backend research
- [ ] Carter backend research
- [x] generated endpoint layer separated from business services
- [x] route/query/query-object/body/header/cookie/form binding
- [x] typed responses and status codes
- [x] feature/group organization
- [x] dependency injection service boundaries
- [ ] validation composition

Models:

- `nestjs`
- `fastapi-backend`

## Persistence

- [x] `unit/persistence/ef-core-entities` — entity + fluent configuration implementation present; verification deferred
- [ ] EF Core fluent configuration variant
- [ ] Dapper model/repository research
- [ ] Linq2db research
- [x] primary/generated keys
- [x] table/schema names
- [x] indexes and uniqueness
- [x] relations
- [x] delete behavior
- [x] enums
- [x] temporal mapping
- [x] decimal/money
- [ ] concurrency/version fields if represented semantically
- [ ] database checks where supported

Primary model: `typeorm-entities`.

## Validation

- [x] `unit/validation/fluentvalidation-dtos` — implementation present; verification deferred
- [ ] DataAnnotations DTO validation
- [x] nested validation
- [x] collection validation
- [x] enum validation
- [x] length/range/pattern mappings
- [x] common string formats
- [ ] cross-field invariant strategy
- [x] provide `schema.validation` and `schema.types`

Primary model: `class-validator-dtos`.

## Client SDKs

- [x] `unit/clients/csharp-client-sdk` — implementation present; verification deferred
- [x] HttpClient baseline transport
- [x] System.Text.Json models
- [x] typed operations
- [x] path/query/body bindings
- [x] typed outputs
- [x] error model
- [ ] Refit-based alternative research
- [x] provide operation/type/enum capability slots

## Projects and UI

- [ ] ASP.NET Core Web API project
- [ ] Minimal API project
- [ ] Blazor Web App project research
- [ ] Blazor CRUD forms/components research
- [ ] .NET MAUI client project research
- [ ] compose backend, validation and persistence explicitly
- [ ] realistic appsettings/configuration scaffold
- [ ] real integration test fixture

## Other .NET candidates

- [ ] MassTransit messaging research
- [ ] MediatR request/handler pack research
- [ ] GraphQL Hot Chocolate research
- [ ] gRPC .NET research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] authentication/authorization
- [ ] generic/container responses
- [x] nullable reference type mapping, with absent-vs-null limitation documented

C# attributes, EF types and ASP.NET routing syntax belong in packs, not Runtime IR.
