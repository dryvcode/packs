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

## Proposed Usage field

```yaml
packs:
  <activation>:
    place:
      <public-placement>:
        path: [...]
        filename: ...
```

## Proposed example document

```yaml
version: dryv.example/v1alpha1

destination:
  name: backend
  path: apps/backend

packs:
  app:
    pack: self
```

The exact example schema is intentionally **not locked**.

The main requirement is that it be source-neutral and materializable into normal explicit `dryv.yaml`.

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

## Questions these examples are meant to help validate

1. Are `unit` and `inject` enough as layouts?
2. Are terminal names such as `nestjs`, `zod`, `typeorm` sufficiently clear?
3. Is `target` a clear name for runtime implementation compatibility metadata?
4. Is `place` readable in project Usage?
5. Is `placements` readable in pack manifests?
6. Should placement paths be YAML arrays, slash-delimited strings, or both?
7. Is `contract` the right term for generated representation compatibility?
8. Is `locality` understandable for same-unit/cross-unit constraints?
9. Should examples use a dedicated `dryv.example/v1alpha1` document or a constrained Usage projection?
10. Does aggregate capability consumption belong inside template `imports`, or deserve its own explicit construct?

These examples should be changed freely while the design is still in planning.
