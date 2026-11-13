# Invalid examples the Engine/tooling should reject

These are review fixtures for expected validation behavior.

## Positional/grouped needs

Wrong:

```yaml
needs:
  - schema.validation
```

Wrong:

```yaml
needs:
  required:
    - schema.validation
```

Correct:

```yaml
needs:
  schema.validation: required
```

because `#/needs/schema.validation` must be a real semantic ref target.

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

## Named $options map

Wrong:

```yaml
$options:
  naming_strategy:
    snake: snake
    camel: camel
```

`$options.<field>` must be a non-empty ordered list.

Correct:

```yaml
$options:
  naming_strategy:
    - snake
    - camel
```

## Explicit default inside $options

Wrong:

```yaml
$options:
  naming_strategy:
    default: snake
    values: [snake, camel]
```

Use a normal hard-coded field as the default, or let the first option be the default.

## Wrong option type

If `commands` is an array field:

```yaml
$options:
  commands:
    - run: [pnpm, exec, prettier]
```

is wrong because the listed option is an object, not a complete commands array.

Correct:

```yaml
$options:
  commands:
    -
      - run: [pnpm, exec, prettier]
```

## Special runner field

Wrong:

```yaml
destinations:
  backend:
    path: apps/backend
    runner: bun
```

If command alternatives are needed, expose alternatives on the ordinary action fields.

## Nested code destination namespace

Wrong:

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

Wrong:

```yaml
destination:
  $ref: "#/destinations/code/backend"
```

Correct:

```text
#/destinations/backend
```

## Invalid activation root

```yaml
destination:
  $ref: "#/destinations/backend"
  root: [.., secrets]
```

Activation roots must remain inside the destination unit.

## Missing required provider

```yaml
needs:
  schema.validation: required
```

requires a compatible binding.

## Unknown output template

```yaml
outputs:
  hidden-bootstrap:
    path: [custom]
```

If `hidden-bootstrap` is not a real template key, reject it.

## Output path traversal

```yaml
outputs:
  entity:
    path: [.., secrets]
```

Reject before planning.

## Invalid action ref

```yaml
actions:
  - $ref: "#/actions/missing"
```

Every ref must resolve to a real root action.

## Unknown option selection

A materialization selection such as:

```text
#/packs/server/missing = 1
```

must fail if that field has no visible `$options`.

## Out-of-range option selection

If a field exposes choices 0 and 1, selecting index 2 must fail.

## Invalid scalar input choice

If a pack input allows:

```text
snake | camel
```

an example alternative `kebab` must fail normal Usage/input validation.
