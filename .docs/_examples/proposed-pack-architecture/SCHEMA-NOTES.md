# Proposed syntax review notes

Status: **design-only**

These examples intentionally use proposed fields so the complete design can be reviewed before changing Dryv contracts.

## Proposed pack fields

```yaml
layout: unit | inject

target:
  languages: [...]
  frameworks: [...]

placements:
  <name>:
    path: [...]
    filename: ...

templates:
  <name>:
    $ref: "#/selections/..."
    output:
      placement: <name>
      name: ...
      symbol: ...

needs:
  <slot>:
    required: true
    match: ...
    locality: ...
    accepts:
      contracts: [...]

provides:
  <slot>:
    $ref: ...
    contract: ...
    symbol: ...
```

### Placement belongs to output

A template does not have a sibling `placement` field.

Preferred:

```yaml
module:
  $ref: "#/selections/http-features"
  output:
    placement: module
    name: "$(feature.name.kebab)"
    symbol: "$(feature.name.pascal)Module"
```

Reason:

```text
selection
    decides which semantic items invoke the template

output
    describes the generated representation:
      placement
      name
      symbols
```

## Proposed Usage placement

Placement overrides live on the generated-unit destination.

```yaml
destinations:
  code:
    backend:
      path: apps/backend

      place:
        server:
          controller:
            path: [src, controllers]
            filename: "$(feature.name.kebab).controller.ts"

        validation:
          schema:
            path: [src, contracts]

        persistence:
          entity:
            path: [src, models]

packs:
  server:
    path: inject/backend/nestjs
    destination: { $ref: "#/destinations/code/backend" }

  validation:
    path: inject/validation/zod
    destination: { $ref: "#/destinations/code/backend" }
```

The first key under `place` is the pack **activation** targeting this destination.

The second key is a public placement declared by that pack.

This makes the destination the one view of the unit's generated structure.

## Relationship

```text
pack manifest:
  placements.controller
        ↑
template output:
  placement: controller
        ↑
project destination:
  place.server.controller
        ↑
pack activation:
  server -> destination backend
```

The Planner combines these facts and computes the final artifact path.

## Proposed example document

```yaml
version: dryv.example/v1alpha1

usage:
  destinations:
    code:
      backend:
        path: apps/backend

  packs:
    app:
      pack: self
      destination: { $ref: "#/destinations/code/backend" }
```

`pack: self` and logical pack IDs are example-time source-neutral references. A Client resolves them to normal explicit Usage sources and paths.

## Generic setup choice

A key design goal is that **any one normal Usage value** may be replaced by an example-time choice.

```yaml
<normal-field>:
  $example:
    title: Question shown during setup
    default: one
    options:
      one:
        title: First option
        value: <normal value>

      two:
        title: Second option
        value: <normal value>
```

After the user/agent chooses, `$example` disappears.

The selected `value` occupies the normal field and must validate against that field's ordinary Usage schema.

### Example: package manager

```yaml
choose:
  js.package_manager:
    $example:
      default: bun
      options:
        bun:  { value: bun }
        pnpm: { value: pnpm }
        npm:  { value: npm }
        yarn: { value: yarn }
```

### Example: provider pack

```yaml
packs:
  validation:
    $example:
      title: Validation implementation
      default: zod
      options:
        zod:
          value:
            pack: inject/validation/zod
            destination: { $ref: "#/destinations/code/backend" }

        class-validator:
          value:
            pack: inject/validation/class-validator
            destination: { $ref: "#/destinations/code/backend" }
```

The consumer continues binding to the stable activation name `validation`.

### Example: pack input

```yaml
inputs:
  naming_strategy:
    $example:
      default: snake
      options:
        snake: { value: snake }
        camel: { value: camel }
```

### Example: coordinated structure

One `$example` can wrap the complete normal destination `place` value:

```yaml
place:
  $example:
    title: Backend source structure
    default: feature
    options:
      feature:
        value:
          server: ...
          validation: ...
          persistence: ...

      generated:
        value:
          server: ...
          validation: ...
          persistence: ...
```

This avoids JSON-pointer patches and avoids asking separate placement questions that must stay synchronized.

## Contract options versus example options

These are intentionally different.

```text
pack/Engine contract
    says what is legal

dryv.example.yaml
    says which useful choices the pack author wants to present

Client/catalogue
    may discover additional legal alternatives
```

For example, a NestJS server need may accept several validation representation contracts. Its example can recommend Zod and class-validator without making those the only legal providers.

## Placement compatibility across provider choices

If one activation may resolve to several interchangeable providers, destination structure should not depend on provider-private placement names.

Preferred rule:

- alternative providers should share compatible public placement keys where the output role is equivalent;
- destination profiles override only common structure where possible;
- provider-specific filename defaults remain in the provider pack.

Example:

```text
inject/validation/zod
  placement: schema
  default filename: <name>.schema.ts

inject/validation/class-validator
  placement: schema
  default filename: <name>.dto.ts
```

A destination structure can safely say:

```yaml
validation:
  schema:
    path: [src, contracts]
```

without forcing one provider's filename convention onto another.

## Proposed aggregate import

The unit example uses the idea:

```yaml
imports:
  - $ref: "#/needs/operation.server"
    mode: all
```

This means:

> give the root template every unique public representation supplied through this capability.

The exact spelling may change. The behavior is what matters.

## Questions still worth validating

1. Are `unit` and `inject` enough as layouts?
2. Is `target` the right name for runtime implementation compatibility metadata?
3. Is `place` the clearest destination-level spelling?
4. Should path values be arrays only, strings only, or accept both and normalize?
5. Is `contract` the right term for generated representation compatibility?
6. Is `locality` understandable for same-unit/cross-unit constraints?
7. Should `dryv.example/v1alpha1` remain a dedicated example document wrapping a Usage-shaped `usage` object?
8. Should example choices eventually support an explicit `omit: true` for optional fields?
9. Does aggregate capability consumption belong inside template `imports`, or deserve a dedicated construct?
10. Can `PackActivation.destinations` be removed once destination-root + placement covers the real use cases?

These examples should be changed freely while the design is still in planning.
