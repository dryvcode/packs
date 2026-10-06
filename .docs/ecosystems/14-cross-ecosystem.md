# Cross-ecosystem candidates

Status: active cross-ecosystem roadmap. Documentation and testing are both proven purposes with multiple portable packs.

These candidates cut across languages. A new repository purpose must only be introduced when a real pack justifies it.

## Contracts and API descriptions

- [x] OpenAPI 3.1 — `package/documentation/openapi`; uses Engine-provided canonical effective HTTP paths and same-pack JSON Schema artifacts
- [x] JSON Schema 2020-12 — `package/validation/json-schema`
- [ ] AsyncAPI research
- [ ] GraphQL schema pack research
- [ ] protobuf/gRPC contract pack research

Questions:

- [x] JSON Schema target is generated validation output; Runtime IR remains semantic authority
- [x] generated contract artifacts must never replace Canonical Runtime IR inside Dryv
- [x] generated artifacts use the normal Dryv plan/file trace; Runtime IR remains authority
- [x] contract/document packs may be `package` when they form a portable standalone artifact set

## Documentation

- [x] API reference documentation pack — `inject/documentation/markdown-reference`
- [x] Markdown schema catalogue
- [x] operation catalogue
- [x] Mermaid relationship diagrams
- [ ] architecture/reference site fragments
- [ ] client SDK usage docs
- [ ] generated examples from operation input/output semantics

`documentation` is now an approved/proven purpose because a real portable pack exists. New documentation packs must still consume Runtime IR/context rather than maintain a second semantic model.

## Testing

- [x] generated API status contract checks — Postman, Bruno and k6 packs
- [x] HTTP smoke tests — `package/testing/http-smoke-tests` and `package/testing/k6-smoke-tests`
- [x] authored schema example fixtures — `inject/testing/schema-examples`
- [ ] generated client integration tests
- [ ] generated backend route tests
- [ ] persistence mapping tests
- [ ] Playwright UI-flow research when view semantics support it
- [x] Postman Collection v2.1 — `package/testing/postman-collection`
- [x] Bruno/OpenCollection YAML — `package/testing/bruno-collection`

`testing` is proven by authored schema examples plus generated HTTP collections/smoke suites. Testing packs must state whether values are authored or synthesized; synthesized placeholders are output scaffolding only.

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
- [x] reusable backend project composition pattern proven by `project/backend/nestjs-app`
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
