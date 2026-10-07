# 06 — NestJS composition and example

Status: **blocked by Tasks 04 and 05**

## Goal

Make the NestJS packs demonstrate a complete explicit Dryv composition using the current `dryv.example.yaml` contract.

## Example model

`dryv.example.yaml` is:

```text
ordinary dryv.yaml shape
+ generic ordered $options metadata
```

No second setup DSL.

For a field of type `T`:

```text
normal field: T

$options:
  field:
    - T
    - T
```

If the normal field exists, it is choice 0/default.

If it is absent, the first option is choice 0/default.

No:

- named option IDs;
- `default:` option metadata;
- runner/profile pseudo-fields;
- fake refs.

## Required composition proof

The example should explicitly activate and bind:

```text
unit/backend/nestjs
inject/backend/nestjs
validation provider
persistence provider when selected
```

and show:

- real pack sources;
- flat destination;
- activation destination roots;
- `operation.server` binding;
- `schema.validation` binding;
- optional/recommended persistence behavior according to the final contract;
- output overrides where useful;
- concrete actions;
- ordered `$options` alternatives where useful.

## Pack/example separation

`dryv.pack.yaml` declares legal generation behavior.

`dryv.example.yaml` recommends project setup choices.

`dryv.yaml` records the materialized project decision.

Do not move generated-code dependencies from the pack into the example.

## Validation

The example must:

- validate as `DryvExample`;
- expose deterministic defaults;
- materialize to ordinary `DryvUsage`;
- contain no `$options` after materialization;
- resolve all refs;
- produce a valid binding graph;
- plan successfully.
