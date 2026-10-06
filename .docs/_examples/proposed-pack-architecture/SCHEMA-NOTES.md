# Proposed syntax review notes

Status: **aligned with the latest Dryv design decisions**

## Pack manifest

```yaml
layout: unit | inject

info:
  title: TypeORM
  version: 0.1.0
  purpose: persistence
  summary: TypeORM entities.
  languages: [typescript]
  frameworks: [typeorm]
  tags: [persistence, orm, entity]

inputs: ...
needs: ...
selections: ...
templates: ...
provides: ...
dependencies: ...
```

Do not duplicate metadata under `catalog:` or `target:`.

## Needs are keyed

```yaml
needs:
  schema.validation: required
  schema.persistence: recommended
  property.enum.types: optional
```

This preserves stable refs such as:

```text
#/needs/schema.validation
```

Do not use positional/grouped lists for semantically addressable needs.

## Provides use real template refs

```yaml
provides:
  schema.persistence:
    $ref: "#/templates/entity"
```

## Flat destination map

```yaml
destinations:
  backend:
    path: apps/backend
```

Pack activations reference:

```text
#/destinations/backend
```

## Activation destination root

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]
```

Final placement:

```text
destination.path
+ activation destination.root
+ final output.path
```

The root is optional and pack-activation-specific.

## Activation output overrides

```yaml
packs:
  persistence:
    destination:
      $ref: "#/destinations/backend"
      root: [src]

    outputs:
      entity:
        path: [models]
        symbol: "$(subject.name.pascal)Model"
```

Output keys are real template keys.

## dryv.example.yaml is Usage-shaped

The only generic extension is sibling `$options`.

```yaml
inputs:
  naming_strategy: snake

  $options:
    naming_strategy:
      - camel
```

A hard-coded value is choice 0/default.

Without the hard-coded value:

```yaml
inputs:
  $options:
    naming_strategy:
      - snake
      - camel
```

the first list item is choice 0/default.

## $options is always an ordered list

Do not write named option maps:

```yaml
# wrong
$options:
  naming_strategy:
    snake: snake
    camel: camel
```

Do not add:

```yaml
default: ...
```

The correct form is:

```yaml
$options:
  naming_strategy:
    - snake
    - camel
```

## Preserve the normal field type

Conceptually:

```text
field: T

$options:
  field:
    - T
    - T
```

For an array-valued field, each option is therefore a full array value.

For an object-valued field, each option is a full object value.

## Coordinated changes

If command and dependency configuration must change together, expose alternatives for the complete action definition at the parent `actions` map.

Do not create hidden coupling between two unrelated option lists.

Example:

```yaml
actions:
  install:
    stage: final
    commands:
      - run: [bun, add]

  $options:
    install:
      - stage: final
        commands:
          - run: [pnpm, add]
```

## No special runner fields

Do not add example-only:

```text
runner
runners
runner selectors
profile IDs
package-manager option IDs
```

Tool alternatives are ordinary values of ordinary fields.

## Materialization

Selections use the real field pointer plus an integer choice index:

```text
#/actions/format/commands = 1
#/packs/persistence/inputs/naming_strategy = 1
```

After selection:

- all `$options` metadata disappears;
- version becomes `dryv/v1alpha1`;
- the document validates as ordinary Usage.

## Real-reference rule

Semantically referenced nodes stay keyed and real:

```text
#/needs/schema.validation
#/templates/entity
#/actions/format
#/destinations/backend
#/packs/persistence
```
