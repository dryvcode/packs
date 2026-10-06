# Invalid examples the Engine should reject

These are design fixtures for expected validation behavior.

## Wrong language provider

```yaml
app:
  pack: unit/backend/nestjs
  bind:
    operation.server: fastapi

fastapi:
  pack: inject/backend/fastapi
```

Expected:

```text
usage.bind.language_mismatch
NestJS unit requires a compatible TypeScript operation.server provider.
```

## Wrong server framework

```yaml
app:
  pack: unit/backend/nestjs
  bind:
    operation.server: express

express:
  pack: inject/backend/express
```

If the NestJS unit requires a NestJS-compatible server representation:

```text
usage.bind.framework_mismatch
```

## Wrong representation

A consumer accepts:

```text
zod-schema
class-validator-dto
joi-schema
```

but the provider exposes:

```text
json-schema-document
```

Expected:

```text
usage.bind.representation_mismatch
```

## Placement traversal

```yaml
place:
  entity:
    path: [.., .., secrets]
```

Expected:

```text
usage.place.path_invalid
```

## Undeclared placement

Pack declares only:

```text
controller
service
module
```

Usage tries:

```yaml
place:
  hidden-bootstrap:
    path: [src, custom]
```

Expected:

```text
usage.place.unknown
```

## Collision after override

```yaml
place:
  controller:
    path: [src, generated]
    filename: "$(feature.name.kebab).ts"

  service:
    path: [src, generated]
    filename: "$(feature.name.kebab).ts"
```

Expected:

```text
planner.output.collision
```

## Cross-unit locality violation

A same-unit validation need is bound to a provider generated into another destination.

Expected:

```text
usage.bind.locality_mismatch
```
