# Proposed syntax review notes

Status: **design-only**

These examples intentionally use proposed fields so the design can be reviewed before changing Dryv contracts.

## Pack manifest: stay small

The proposed pack keeps the existing core model:

```yaml
layout: unit | inject

target:
  languages: [...]
  frameworks: [...]

inputs: ...
needs: ...
selections: ...

templates:
  entity:
    $ref: "#/selections/entities"
    output:
      name: $(subject.name.kebab)
      path:
        - $(group.name.kebab)
        - entities
      symbol: $(subject.name.pascal)Entity

provides: ...
dependencies: ...
```

There is **no** proposed `placements:` registry and no `output.placement`.

## Pack output path rule

Proposed rule:

```text
output.path[0]
    must contain a Dryv planning token

output.path[1:]
    may contain dynamic or static pack-local segments
```

Good:

```yaml
path: ["$(group.name.kebab)", entities]
```

Bad reusable-pack default:

```yaml
path: [src, models]
```

Project roots and architectural folders belong to Usage.

## Usage output overrides

```yaml
destinations:
  code:
    backend:
      path: apps/backend

      outputs:
        persistence:
          entity:
            path: [src, models, "$(group.name.kebab)"]
            name: "$(subject.name.kebab)"
            symbol: "$(subject.name.pascal)Model"
```

Address:

```text
persistence
  = pack activation

entity
  = template key
```

The override is a partial normal output object.

Supported direction:

```text
name
path
symbol
symbols
```

## Default output

If no destination override exists:

```text
pack template filesystem
+ pack output.path
+ pack output.name
= default output
```

The pack requires no setup metadata to work.

## Compact dryv.example.yaml choices

Scalar choices should stay terse:

```yaml
choose:
  js.package_manager: [bun, pnpm, npm, yarn]

inputs:
  naming_strategy: [snake, camel]
```

A provider may be suggested similarly:

```yaml
packs:
  validation:
    pack:
      - inject/validation/zod
      - inject/validation/class-validator
```

First item is the suggested default.

Do not write:

```yaml
npm:
  value: npm
```

for scalar options.

## Structured choices

For complex values use a compact named option map:

```yaml
outputs:
  $options:
    default: pack-default

    pack-default: {}

    feature:
      server:
        controller:
          path: [src, modules, "$(feature.name.kebab)"]

    generated:
      server:
        controller:
          path: [src, _generated, controllers]
```

The exact marker name remains open, but option values should be direct values without an extra `value:` wrapper.

## Import addressing

Destination-level proposal:

```yaml
imports:
  root: src
  prefix: "@/"
```

No `imports` block means relative addressing.

The Planner should expose generic facts such as:

```text
producer final path
consumer final path
relative path
unit-relative path
import-root-relative path
configured prefix
provider package identity
provider import-root-relative path
final producer symbol(s)
```

Target packs decide how those facts become:

```text
../../models/user
@/models/user
dryv.models.user
com.dryv.api.users.User
package:riderescue_api/src/models/user.dart
```

## Questions to validate

1. Is `outputs` the clearest destination-level name?
2. Should output overrides permit all existing output fields by default?
3. What exact opt-out spelling should a fixed output use?
4. Is first-segment-dynamic the right reusable-pack constraint?
5. Should the compact complex-choice marker be `$options`, `$choose`, or another name?
6. Is first scalar-list item an acceptable suggested default?
7. Should import configuration be `imports.root/prefix`, or use an `address` term?
8. Which generic import-address facts belong in renderer context?
9. How should same-unit package-style imports select the current unit's package identity?
10. Can current `PackActivation.destinations` be removed once unit root + output overrides cover the real use cases?
