# Invalid examples the Engine should reject

These are design fixtures for expected validation behavior.

## Wrong language provider

A NestJS unit binds a Python server provider.

Expected:

```text
usage.bind.language_mismatch
```

## Wrong framework/representation

A NestJS unit needs a `nestjs-feature-module` but receives an incompatible server representation.

Expected:

```text
usage.bind.framework_mismatch
or
usage.bind.representation_mismatch
```

## Output override names unknown activation

```yaml
destinations:
  code:
    backend:
      path: apps/backend
      outputs:
        missing-pack:
          entity:
            path: [src, models]
```

Expected:

```text
usage.output.unknown_activation
```

## Output override names unknown template

```yaml
outputs:
  persistence:
    hidden-bootstrap:
      path: [src, custom]
```

Expected:

```text
usage.output.unknown_template
```

## Output path traversal

```yaml
outputs:
  persistence:
    entity:
      path: [.., secrets]
```

Expected:

```text
usage.output.path_invalid
```

## Collision after overrides

Two final outputs resolve to the same workspace file.

Expected:

```text
planner.output.collision
```

## Fixed output overridden

A template explicitly disables output overrides, but Usage attempts to change it.

Expected:

```text
usage.output.override_forbidden
```

## Import root does not contain producer

```yaml
imports:
  root: src
  prefix: "@/"
```

but an imported producer resolves under:

```text
generated-outside-src/model.ts
```

Expected:

```text
usage.imports.unreachable
```

## Cross-unit package lacks import identity

A consumer needs a provider from another unit, but the provider has no usable package identity/import root.

Expected:

```text
usage.bind.import_unreachable
```

## Invalid scalar example choice

The pack input allows:

```text
snake | camel
```

but the example exposes:

```yaml
naming_strategy: [snake, kebab]
```

Expected:

```text
example.option.invalid_value
```

Every example option is validated against the normal field contract it represents.
