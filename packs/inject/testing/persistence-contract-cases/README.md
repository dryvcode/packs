# Persistence Contract Cases pack

Generates one machine-readable JSON persistence contract descriptor per Dryv entity schema.

Each case captures the semantic facts an ORM or migration adapter is expected to translate:

- storage name, namespace and kind;
- primary/composite keys;
- scalar field ownership and nullability;
- indexes and uniqueness;
- defaults and mutation ownership;
- owning/inverse relations;
- relation cardinality and delete/update lifecycle;
- schema invariants.

The descriptors intentionally use **semantic target schema/field identity**, not guessed physical FK table strings. This lets cross-language tests detect where a target adapter is making assumptions beyond current Runtime IR/context.

These JSON files are testing projections only and never become persistence authority.

Verification is deferred while the Dryv Engine is under maintenance.
