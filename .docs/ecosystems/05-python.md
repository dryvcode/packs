# Python ecosystem

Status: FastAPI backend, standalone Pydantic models, SQLAlchemy persistence and HTTPX client SDK are implemented on `develop`; verification of the new packs is deferred while the Dryv Engine is under maintenance.

## Existing coverage

- [x] `unit/backend/fastapi-backend`
- [x] `unit/validation/pydantic-models` — verification deferred
- [x] `unit/persistence/sqlalchemy-models` — verification deferred
- [x] `unit/clients/python-client-sdk` — verification deferred

## Backend candidates

- [ ] Django backend
- [ ] Django REST Framework backend
- [ ] Flask backend
- [ ] Litestar backend
- [ ] Sanic backend
- [ ] Starlette backend
- [ ] Falcon backend research
- [ ] generated routing separated from business services
- [ ] path/query/body/header bindings
- [ ] outputs/status mapping
- [ ] feature/group organization
- [ ] validation composition

Models:

- `fastapi-backend`
- `nestjs`

## Persistence

- [x] `unit/persistence/sqlalchemy-models`
- [ ] SQLModel models
- [ ] Django ORM models
- [ ] Tortoise ORM models
- [ ] Beanie document models
- [ ] MongoEngine research
- [x] primary/generated keys
- [x] tables/collections/namespaces
- [x] indexes and uniqueness
- [ ] relations
- [ ] delete behavior
- [x] enums
- [x] temporal types
- [x] Decimal/money
- [ ] defaults
- [x] simple invariants/check constraints

Models:

- SQL ORM → `typeorm-entities`
- document model → `mongoose-models`

## Validation and schema types

- [x] `unit/validation/pydantic-models`
- [ ] Marshmallow schemas
- [ ] attrs/cattrs research
- [ ] dataclass schema/types pack research
- [x] nested schemas
- [x] optional/null distinction
- [x] collection constraints
- [x] enums
- [x] range/length/pattern
- [x] common formats
- [ ] simple invariants
- [x] reusable `schema.validation` and `schema.types` capability exports

Models:

- `class-validator-dtos`
- FastAPI's existing Pydantic model generation

## Client SDKs

- [x] `unit/clients/python-client-sdk`
- [x] httpx transport
- [ ] requests-based variant research
- [x] Pydantic or dataclass models
- [x] typed operations
- [x] path/query/body bindings
- [x] response decoding
- [x] async-first client strategy
- [x] typed error surface
- [x] provide operation/type/enum capabilities

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] FastAPI project
- [ ] Django project
- [ ] Django REST Framework project
- [ ] Flask project
- [ ] Litestar project
- [ ] unit ownership versus ecosystem package identity audit
- [ ] compose persistence and validation packs instead of duplicating them
- [ ] realistic pyproject configuration
- [ ] real pytest integration fixture

## Other Python candidates

- [ ] Typer CLI generation research
- [ ] Celery task pack research
- [ ] Strawberry GraphQL research
- [ ] Ariadne GraphQL research
- [ ] gRPC Python research
- [ ] OpenTelemetry integration research

## Context questions to verify

- [x] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] authentication/security
- [ ] generic/container output models

Do not move SQLAlchemy/Pydantic/Django implementation vocabulary into Runtime IR.
