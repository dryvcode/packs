# Elixir ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation/schema pack
- [ ] API client SDK
- [ ] project pack

## Backends

- [ ] Phoenix controllers/routes
- [ ] Phoenix JSON API backend
- [ ] Plug backend research
- [ ] Ash Framework research
- [ ] generated transport layer separated from application/domain logic
- [ ] path/query/body binding
- [ ] output/status mapping
- [ ] feature/group organization

Models:

- `fastapi-backend`
- `nestjs-backend`

## Persistence

- [ ] Ecto schemas
- [ ] Ecto associations
- [ ] table/schema naming
- [ ] primary/generated keys
- [ ] indexes/uniqueness
- [ ] nullability/defaults
- [ ] enums
- [ ] temporal/decimal mapping
- [ ] relation/delete semantics
- [ ] migration ownership research

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] Ecto changesets as validation
- [ ] embedded schema DTOs
- [ ] changeset constraints from field semantics
- [ ] nested/collection validation
- [ ] enum/range/length/pattern
- [ ] cross-field invariant strategy
- [ ] decide whether validation and persistence should be separate composable packs

## Client SDKs

- [ ] `package/clients/elixir-client-sdk`
- [ ] Req transport
- [ ] Tesla alternative research
- [ ] model/struct generation
- [ ] typed operation conventions via specs
- [ ] path/query/body binding
- [ ] response decoding
- [ ] error model

## Projects

- [ ] Phoenix API project
- [ ] Phoenix JSON project
- [ ] Plug API project research
- [ ] Mix project/package ownership
- [ ] compose Ecto/validation explicitly
- [ ] real ExUnit integration fixture

## Other Elixir candidates

- [ ] Absinthe GraphQL research
- [ ] Broadway messaging research
- [ ] Oban job pack research
- [ ] Phoenix LiveView UI generation research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] channel/WebSocket semantics
