# Invalid examples the Engine/tooling should reject

These are design fixtures for expected validation behavior.

## Nested code destination namespace

```yaml
destinations:
  code:
    backend:
      path: apps/backend
```

The current model is flat:

```yaml
destinations:
  backend:
    path: apps/backend
```

## False destination ref

```yaml
destination:
  $ref: "#/destinations/code/backend"
```

Expected target is a real node such as:

```text
#/destinations/backend
```

## Wrong language provider

A NestJS consumer binds an incompatible-language provider.

Expected: compatibility validation failure before render.

## Missing required provider

A pack declares:

```yaml
needs:
  - schema.validation
```

but its activation does not bind that capability.

Expected:

```text
usage.bind.missing
```

## Output override names unknown template

```yaml
packs:
  persistence:
    ...
    outputs:
      hidden-bootstrap:
        path: [src, custom]
```

If `hidden-bootstrap` is not a real template key in that pack:

```text
usage.output.unknown_template
```

## Output path traversal

```yaml
packs:
  persistence:
    ...
    outputs:
      entity:
        path: [.., secrets]
```

Expected:

```text
usage.output.path_invalid
```

## Collision after overrides

Two final activation/template outputs resolve to the same workspace file.

Expected:

```text
planner.output.collision
```

## Invalid action ref

```yaml
destinations:
  backend:
    path: apps/backend
    actions:
      - $ref: "#/actions/missing"
```

Expected: fail because the ref does not resolve to a real action.

## Runner alternative survives materialization

Normal `dryv.yaml` contains:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier, --write, $(files)]
  - run: [bun, x, prettier, --write, $(files)]
```

after setup has already selected Bun.

Expected: runner hardening should reject/avoid unresolved example-only alternatives in materialized Usage.

## Unsupported runner

An example destination selects `dart`, but the selected action exposes only Bun/pnpm/npm/Yarn command variants.

Expected: materialization failure before Usage is written.

## Conflicting runner dependency rules

Two matching grouped runner rules produce incompatible dependency formats for the same selected runner.

Expected: deterministic materialization failure; no hidden precedence.

## Import root does not contain final producer

Destination import root is `src`, but the final producer resolves outside it.

Expected import reachability failure.

## Invalid scalar input choice

A pack input allows:

```text
snake | camel
```

but an example exposes `kebab`.

Expected:

```text
example.option.invalid_value
```
