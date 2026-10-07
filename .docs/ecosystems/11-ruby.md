# Ruby ecosystem

Status: Sinatra backend, Active Record persistence, dry-validation contracts and Net::HTTP client SDK are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation pack
- [x] API client SDK
- [ ] project pack

## Backends

- [ ] Rails API controllers/routes
- [x] `unit/backend/sinatra-backend` — implementation present; verification deferred
- [ ] Hanami backend
- [ ] Roda research
- [x] generated HTTP layer separated from domain/services
- [x] path/query/query-object/header/cookie/body/form binding
- [x] response/status mapping
- [x] feature/group organization

Models:

- `nestjs-backend`
- `fastapi-backend`

## Persistence

- [x] `unit/persistence/active-record-models` — implementation present; verification deferred
- [ ] Sequel models
- [ ] ROM research
- [x] primary/generated keys
- [x] table naming
- [ ] indexes/uniqueness — migration-layer concern
- [x] relations
- [ ] database delete/update behavior — migration-layer concern
- [x] enums
- [x] temporal/decimal types
- [ ] defaults/check constraints

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] ActiveModel validations
- [x] `unit/validation/dry-validation-contracts` — implementation present; verification deferred
- [ ] dry-schema research
- [x] nested/collection validation
- [x] enum validation
- [x] range/length/pattern
- [x] common string formats
- [x] cross-field invariant mapping

Primary model: `class-validator-dtos`.

## Client SDKs

- [x] `unit/clients/ruby-client-sdk` — implementation present; verification deferred
- [x] Net::HTTP baseline
- [ ] Faraday-backed implementation research
- [x] typed-ish generated wire models
- [x] path/query/query-object/header/cookie/body/form binding
- [x] response decoding
- [x] structured API error model

## Projects

- [ ] Rails API project
- [ ] Sinatra API project
- [ ] Hanami project
- [ ] Bundler/gemspec ownership
- [ ] compose persistence/validation rather than duplicate them
- [ ] real request/integration fixture

## Other Ruby candidates

- [ ] GraphQL-Ruby research
- [ ] Sidekiq job pack research
- [ ] Sorbet/RBS generated types research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] how strongly typed capability slots should map into dynamic Ruby output
