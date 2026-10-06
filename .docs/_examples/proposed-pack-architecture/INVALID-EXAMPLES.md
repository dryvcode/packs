# Invalid examples the Engine/tooling should reject

These are review fixtures for expected validation behavior.

## Positional/grouped needs break semantic refs

Do not use:

```yaml
needs:
  - schema.validation
```

or:

```yaml
needs:
  required:
    - schema.validation
```

because templates need a real stable node such as:

```text
#/needs/schema.validation
```

Correct:

```yaml
needs:
  schema.validation: required
```

## Invalid need strength

```yaml
needs:
  schema.validation: preferred
```

Allowed:

```text
required
recommended
optional
```

## Nested code destination namespace

```yaml
destinations:
  code:
    backend:
      path: apps/backend
```

Correct:

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

Correct target:

```text
#/destinations/backend
```

## Invalid activation root

```yaml
destination:
  $ref: "#/destinations/backend"
  root: [.., secrets]
```

Activation roots must remain portable and inside the destination unit.

## Missing required provider

A pack declares:

```yaml
needs:
  schema.validation: required
```

but its activation does not bind that capability.

Expected:

```text
usage.bind.missing
```

Recommended/optional needs may remain unbound.

## Output override names unknown template

```yaml
packs:
  persistence:
    ...
    outputs:
      hidden-bootstrap:
        path: [custom]
```

If `hidden-bootstrap` is not a real template key:

```text
usage.output.unknown_template
```

## Output path traversal

```yaml
outputs:
  entity:
    path: [.., secrets]
```

Expected:

```text
usage.output.path_invalid
```

## Collision after root + override composition

Two activation/template outputs resolve to the same final workspace file after:

```text
destination.path
+ activation root
+ output path
```

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

The ref must resolve to a real root action.

## Runner alternative survives materialization

Normal `dryv.yaml` still contains:

```yaml
commands:
  - run: [(pnpm|yarn), dlx, prettier, --write, $(files)]
  - run: [bun, x, prettier, --write, $(files)]
```

after setup already selected Bun.

Expected: materialization should emit only the concrete selected command(s).

## Unsupported runner

A destination selects `dart`, but an action only exposes Bun/pnpm/npm/Yarn variants.

Expected: fail before Usage is written.

## Conflicting runner rules

Two matching grouped runner rules produce incompatible dependency arguments for one selected runner.

Expected: deterministic failure; no hidden precedence.

## Import root does not contain final producer

The final artifact after activation-root/output composition is outside the configured import root.

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
