# Persistence Reference pack

Generates storage-focused reference documentation for Dryv schemas with role `entity`.

For each entity it documents:

- canonical storage name and namespace;
- scalar field types, nullability and mutation ownership;
- primary/composite key membership;
- indexes and uniqueness;
- owning and inverse relations;
- relation cardinality and declared delete/update lifecycle;
- database-oriented concerns that are present semantically but intentionally **not** emitted as DDL.

This pack is documentation only. It does not generate migrations, SQL or ORM mappings, and therefore does not compete with a project's migration authority.

A recurring current context gap is made visible: relation links identify the target semantic schema/field, but packs do not always have a portable target storage-table identity suitable for emitting database FK strings when storage names are overridden.

Verification is deferred while the Dryv Engine is under maintenance.
