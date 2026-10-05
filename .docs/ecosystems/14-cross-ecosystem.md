# Cross-ecosystem candidates

Status: research backlog only. No new purpose or contract is approved by this file.

These candidates cut across languages. A new repository purpose must only be introduced when a real pack justifies it.

## Contracts and API descriptions

- [ ] OpenAPI document pack
- [ ] JSON Schema document pack
- [ ] AsyncAPI research
- [ ] GraphQL schema pack research
- [ ] protobuf/gRPC contract pack research

Questions:

- [ ] confirm whether the target is generated output or another semantic authority
- [ ] never make OpenAPI/GraphQL/protobuf replace Canonical Runtime IR inside Dryv
- [ ] define trace from Runtime IR items to generated contract artifacts
- [ ] decide whether the pack is `inject` or `package`

## Documentation

- [ ] API reference documentation pack
- [ ] Markdown schema catalogue
- [ ] operation catalogue
- [ ] Mermaid relationship diagrams
- [ ] architecture/reference site fragments
- [ ] client SDK usage docs
- [ ] generated examples from operation input/output semantics

Potential future purpose: `documentation`, only if approved when a real pack is designed.

## Testing

- [ ] generated API contract tests
- [ ] HTTP smoke tests
- [ ] schema validation test fixtures
- [ ] generated client integration tests
- [ ] generated backend route tests
- [ ] persistence mapping tests
- [ ] Playwright UI-flow research when view semantics support it
- [ ] Postman collection generation research
- [ ] Bruno collection generation research

Potential future purpose: `testing`, only if justified.

## Configuration

- [ ] environment variable schema/docs generation
- [ ] typed application configuration research
- [ ] framework config fragments
- [ ] Docker environment/config fragments
- [ ] editor/tooling config only when directly required by a pack

Potential future purpose: `configuration`, only if justified.

## Infrastructure/deployment

- [ ] Dockerfile project fragments
- [ ] Docker Compose service fragments
- [ ] Kubernetes manifests
- [ ] Helm chart research
- [ ] Terraform module research
- [ ] serverless deployment research
- [ ] cloud-specific deployment research

Guardrail: infrastructure packs must consume explicit semantic/configuration facts and must not infer deployment architecture from framework names.

Potential future purpose: `infrastructure`, only if approved.

## Messaging/event-driven systems

- [ ] Kafka producer/consumer packs
- [ ] RabbitMQ packs
- [ ] NATS packs
- [ ] AWS SQS/SNS research
- [ ] Google Pub/Sub research
- [ ] Azure Service Bus research
- [ ] event/message schema packs
- [ ] worker/job handler packs

Guardrail: do not implement these until Runtime IR has explicit semantics for the needed message/event concepts.

Potential future purpose: `messaging`.

## GraphQL

- [ ] schema generation
- [ ] resolver/controller generation
- [ ] client SDK generation
- [ ] frontend hooks
- [ ] pagination/input/output mapping
- [ ] authorization semantics audit

Do not force HTTP operation semantics to impersonate GraphQL if the Runtime IR does not model it.

## gRPC / protobuf

- [ ] protobuf messages
- [ ] service definitions
- [ ] Go client/server
- [ ] Rust tonic client/server
- [ ] Java client/server
- [ ] .NET client/server
- [ ] Python client/server
- [ ] Dart client

Do not add gRPC-specific Runtime IR fields. First determine which semantics are general and which are transport-specific.

## Authentication and authorization

- [ ] auth middleware integration research
- [ ] generated permission guards research
- [ ] JWT helper packs
- [ ] OAuth/OIDC client configuration research
- [ ] API-key binding research

Guardrail: only generate behavior represented explicitly by Runtime IR or approved configuration.

## Observability

- [ ] OpenTelemetry backend integration
- [ ] structured logging integration
- [ ] metrics integration
- [ ] tracing middleware
- [ ] generated operation names/attributes

## Serialization

- [ ] language-specific JSON serializers
- [ ] MessagePack research
- [ ] protobuf serialization
- [ ] XML serialization research where ecosystems require it

## Database/migration output

- [ ] SQL DDL generation research
- [ ] migration scaffold research
- [ ] database-specific schema packs
- [ ] PostgreSQL-specific output research
- [ ] MySQL/MariaDB-specific output research
- [ ] SQLite-specific output research

Guardrail: do not compete with ORM migration authorities without an explicit ownership design.

## Selection/composition research

- [ ] reusable pattern for HTTP SDK packs
- [ ] reusable pattern for SQL ORM packs
- [ ] reusable pattern for validation packs
- [ ] reusable pattern for backend routing packs
- [ ] reusable pattern for UI form packs
- [ ] reusable pattern for full project packs
- [ ] capability-slot vocabulary audit after several cross-language implementations
- [ ] avoid adding slots merely because one framework wants them

## Fixture/toolchain research

- [ ] standard fixture expectations per language
- [ ] compiler/typechecker command conventions
- [ ] package manager/install conventions
- [ ] runtime/integration test expectations
- [ ] generated-project build checks
- [ ] minimum supported toolchain policy
- [ ] local user test command documentation
