# PHP ecosystem

Status: Symfony backend, Doctrine ORM persistence, Symfony Validator DTOs and Guzzle client SDK are implemented on `develop`; verification is deferred while the Dryv Engine is under maintenance.

## Coverage

- [x] backend pack
- [x] persistence pack
- [x] validation pack
- [x] API client SDK
- [ ] project pack

## Backends

- [ ] Laravel controllers/routes
- [x] `unit/backend/symfony-backend` — implementation present; verification deferred
- [ ] Slim backend
- [ ] Mezzio backend research
- [ ] API Platform compatibility research
- [x] generated HTTP layer separated from business services
- [x] path/query/query-object/body/header/cookie/form binding
- [x] response/status mapping
- [x] feature/group organization
- [ ] validation capability composition

Models:

- `nestjs`
- `fastapi-backend`

## Persistence

- [x] `unit/persistence/doctrine-orm-entities` — implementation present; verification deferred
- [ ] Laravel Eloquent models
- [ ] Cycle ORM research
- [x] primary/generated keys
- [x] table/schema naming
- [x] indexes and uniqueness
- [ ] relations
- [ ] delete behavior
- [x] enums
- [x] temporal types
- [x] decimal/money
- [ ] defaults/checks

Primary model: `typeorm-entities`.

## Validation/schema

- [x] `unit/validation/symfony-validator-dtos` — implementation present; verification deferred
- [ ] Laravel validation request classes
- [ ] Respect/Validation research
- [x] nested validation
- [x] arrays/collections
- [x] enums
- [x] range/length/pattern
- [x] common formats
- [x] cross-field invariants

Primary model: `class-validator-dtos`.

## Client SDKs

- [x] `unit/clients/php-client-sdk` — implementation present; verification deferred
- [ ] PSR-18 compatible baseline research
- [x] Guzzle 8.2 implementation
- [x] typed DTOs/enums
- [x] path/query/query-object/body/header/cookie/form binding
- [x] response decoding
- [x] typed error model
- [x] provide operation/type/enum capabilities

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] Laravel API project
- [ ] Symfony API project
- [ ] Slim API project
- [ ] Composer unit ownership and ecosystem package identity rules
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

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] auth/security
- [x] PHP union/nullable type mapping
