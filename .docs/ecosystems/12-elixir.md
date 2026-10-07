# Elixir ecosystem

Status: Phoenix backend, Ecto persistence, Ecto changeset validation and Req client SDK are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation/schema pack
- [x] API client SDK
- [ ] project pack

## Backends

- [ ] Phoenix controllers/routes
- [x] `unit/backend/phoenix-backend` — implementation present; verification deferred
- [ ] Plug backend research
- [ ] Ash Framework research
- [x] generated transport layer separated from application/domain logic
- [x] path/query/query-object/header/cookie/body/form binding
- [x] output/status mapping
- [x] feature/group organization

Models:

- `fastapi-backend`
- `nestjs`

## Persistence

- [x] `unit/persistence/ecto-schemas` — implementation present; verification deferred
- [x] Ecto associations with scalar FK ownership preserved
- [x] table/schema naming
- [x] primary/generated integer/UUID keys
- [ ] indexes/uniqueness — migration-layer concern
- [x] nullability; defaults remain migration/schema concern
- [x] arbitrary enum/structural values via adapter-neutral JSON-text type
- [x] temporal/decimal mapping
- [x] relation navigation; database FK lifecycle remains migration-layer concern
- [ ] migration ownership research

Primary model: `typeorm-entities`.

## Validation/schema

- [x] `unit/validation/ecto-changesets`
- [x] shared generated wire structs with changeset validation
- [x] changeset constraints from field semantics
- [x] nested/collection validation
- [x] enum/range/length/pattern
- [x] simple non-arithmetic invariant lowering; opaque/arithmetic remain explicit gaps
- [x] validation and persistence are separate composable packs

## Client SDKs

- [x] `unit/clients/elixir-client-sdk` — implementation present; verification deferred
- [x] Req 0.7 transport
- [ ] Tesla alternative research
- [x] model/struct generation
- [x] typed-ish operation conventions via specs
- [x] path/query/query-object/header/cookie/body/form binding
- [x] response decoding
- [x] structured API error model

## Projects

- [ ] Phoenix API project
- [ ] Phoenix JSON project
- [ ] Plug API project research
- [ ] Mix unit ownership and ecosystem package identity
- [ ] compose Ecto/validation explicitly
- [ ] real ExUnit integration fixture

## Other Elixir candidates

- [ ] Absinthe GraphQL research
- [ ] Broadway messaging research
- [ ] Oban job pack research
- [ ] Phoenix LiveView UI generation research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] channel/WebSocket semantics
