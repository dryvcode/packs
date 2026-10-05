# PHP ecosystem

Status: candidate backlog only. No implementation is approved by this file.

## Coverage

- [ ] backend pack
- [ ] persistence pack
- [ ] validation pack
- [ ] API client SDK
- [ ] project pack

## Backends

- [ ] Laravel controllers/routes
- [ ] Symfony controllers
- [ ] Slim backend
- [ ] Mezzio backend research
- [ ] API Platform compatibility research
- [ ] generated HTTP layer separated from business services
- [ ] route/query/body binding
- [ ] response/status mapping
- [ ] feature/group organization
- [ ] validation capability composition

Models:

- `nestjs-backend`
- `fastapi-backend`

## Persistence

- [ ] Doctrine ORM entities
- [ ] Laravel Eloquent models
- [ ] Cycle ORM research
- [ ] primary/generated keys
- [ ] table/schema naming
- [ ] indexes and uniqueness
- [ ] relations
- [ ] delete behavior
- [ ] enums
- [ ] temporal types
- [ ] decimal/money
- [ ] defaults/checks

Primary model: `typeorm-entities`.

## Validation/schema

- [ ] Symfony Validator DTOs
- [ ] Laravel validation request classes
- [ ] Respect/Validation research
- [ ] nested validation
- [ ] arrays/collections
- [ ] enums
- [ ] range/length/pattern
- [ ] common formats
- [ ] cross-field invariants

Primary model: `class-validator-dtos`.

## Client SDKs

- [ ] `package/clients/php-client-sdk`
- [ ] PSR-18 compatible baseline research
- [ ] Guzzle implementation
- [ ] typed DTOs/enums
- [ ] path/query/body binding
- [ ] response decoding
- [ ] typed error model
- [ ] provide operation/type/enum capabilities

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] Laravel API project
- [ ] Symfony API project
- [ ] Slim API project
- [ ] Composer package/project ownership rules
- [ ] compose persistence/validation explicitly
- [ ] realistic config and test harness

## Other PHP candidates

- [ ] Laravel Form Request pack
- [ ] Laravel Resource/serializer pack
- [ ] Symfony Serializer pack
- [ ] GraphQL server research
- [ ] Messenger/queue integration research
- [ ] PHPUnit/Pest contract-test research

## Context questions to verify

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [ ] PHP union/nullable type mapping
