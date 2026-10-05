# .NET / C# ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation pack
- [ ] API client SDK
- [ ] frontend/application pack

## Backends

- [ ] ASP.NET Core controllers backend
- [ ] ASP.NET Core Minimal APIs backend
- [ ] FastEndpoints backend research
- [ ] Carter backend research
- [ ] generated endpoint/controller layer separated from business services
- [ ] route/query/body/header binding
- [ ] typed responses and status codes
- [ ] feature/group organization
- [ ] dependency injection boundaries
- [ ] validation composition

Models:

- `nestjs-backend`
- `fastapi-backend`

## Persistence

- [ ] Entity Framework Core entities/configuration
- [ ] EF Core fluent configuration variant
- [ ] Dapper model/repository research
- [ ] Linq2db research
- [ ] primary/generated keys
- [ ] table/schema names
- [ ] indexes and uniqueness
- [ ] relations
- [ ] delete behavior
- [ ] enums
- [ ] temporal mapping
- [ ] decimal/money
- [ ] concurrency/version fields if represented semantically
- [ ] database checks where supported

Primary model: `typeorm-entities`.

## Validation

- [ ] FluentValidation DTOs/validators
- [ ] DataAnnotations DTO validation
- [ ] nested validation
- [ ] collection validation
- [ ] enum validation
- [ ] length/range/pattern mappings
- [ ] common string formats
- [ ] cross-field invariant strategy
- [ ] provide `schema.validation` and `schema.types`

Primary model: `class-validator-dtos`.

## Client SDKs

- [ ] `package/clients/csharp-client-sdk`
- [ ] HttpClient baseline transport
- [ ] System.Text.Json models
- [ ] typed operations
- [ ] path/query/body bindings
- [ ] typed outputs
- [ ] error model
- [ ] Refit-based alternative research
- [ ] provide operation/type/enum capability slots

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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] authentication/authorization
- [ ] generic/container responses
- [ ] nullable reference type mapping

C# attributes, EF types and ASP.NET routing syntax belong in packs, not Runtime IR.
