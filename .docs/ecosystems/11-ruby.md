# Ruby ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation pack
- [ ] API client SDK
- [ ] project pack

## Backends

- [ ] Rails API controllers/routes
- [ ] Sinatra backend
- [ ] Hanami backend
- [ ] Roda research
- [ ] generated HTTP layer separated from domain/services
- [ ] route/query/body binding
- [ ] response/status mapping
- [ ] feature/group organization

Models:

- `nestjs-backend`
- `fastapi-backend`

## Persistence

- [ ] Active Record models
- [ ] Sequel models
- [ ] ROM research
- [ ] primary/generated keys
- [ ] table naming
- [ ] indexes/uniqueness
- [ ] relations
- [ ] delete behavior
- [ ] enums
- [ ] temporal/decimal types
- [ ] defaults/check constraints

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] ActiveModel validations
- [ ] dry-validation contracts
- [ ] dry-schema research
- [ ] nested/collection validation
- [ ] enum validation
- [ ] range/length/pattern
- [ ] common string formats
- [ ] cross-field invariant mapping

Primary model: `class-validator-dtos`.

## Client SDKs

- [ ] `package/clients/ruby-client-sdk`
- [ ] Net::HTTP baseline
- [ ] Faraday-backed implementation research
- [ ] typed-ish model strategy
- [ ] path/query/body binding
- [ ] response decoding
- [ ] error model

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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] how strongly typed capability slots should map into dynamic Ruby output
