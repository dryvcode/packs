# Python ecosystem

Status: candidate backlog only. Existing coverage is marked complete.

## Existing coverage

- [x] `package/backend/fastapi-backend`

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
- `nestjs-backend`

## Persistence

- [ ] SQLAlchemy 2.x models
- [ ] SQLModel models
- [ ] Django ORM models
- [ ] Tortoise ORM models
- [ ] Beanie document models
- [ ] MongoEngine research
- [ ] primary/generated keys
- [ ] tables/collections/namespaces
- [ ] indexes and uniqueness
- [ ] relations
- [ ] delete behavior
- [ ] enums
- [ ] temporal types
- [ ] Decimal/money
- [ ] defaults
- [ ] simple invariants/check constraints

Models:

- SQL ORM → `typeorm-entities`
- document model → `mongoose-models`

## Validation and schema types

- [ ] standalone Pydantic v2 models
- [ ] Marshmallow schemas
- [ ] attrs/cattrs research
- [ ] dataclass schema/types pack research
- [ ] nested schemas
- [ ] optional/null distinction
- [ ] collection constraints
- [ ] enums
- [ ] range/length/pattern
- [ ] common formats
- [ ] simple invariants
- [ ] reusable `schema.validation` and `schema.types` capability exports

Models:

- `class-validator-dtos`
- FastAPI's existing Pydantic model generation

## Client SDKs

- [ ] `package/clients/python-client-sdk`
- [ ] httpx transport
- [ ] requests-based variant research
- [ ] Pydantic or dataclass models
- [ ] typed operations
- [ ] path/query/body bindings
- [ ] response decoding
- [ ] sync vs async client strategy
- [ ] typed error surface
- [ ] provide operation/type/enum capabilities

Models:

- `ts-api-client`
- `dart-client-sdk`

## Projects

- [ ] FastAPI project
- [ ] Django project
- [ ] Django REST Framework project
- [ ] Flask project
- [ ] Litestar project
- [ ] package/project ownership boundary audit
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

- [ ] headers/cookies
- [ ] multipart/files
- [ ] streaming
- [ ] authentication/security
- [ ] generic/container output models

Do not move SQLAlchemy/Pydantic/Django implementation vocabulary into Runtime IR.
