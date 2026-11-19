# next.jdbc Models pack

Generates Clojure 1.12.5 persistence metadata and CRUD helpers using `next.jdbc` 1.3.1118.

This is deliberately **not an ORM**. Each persistent Dryv schema gets:

- canonical table/schema and column metadata;
- primary-key and index metadata;
- wire-map ↔ database-row conversion;
- JSON-string encoding for structural values;
- `insert!`, `find-by`, `update!`, `delete!`, and primary-key lookup helpers.

Create-only/system fields are filtered out of generated update maps. Relations are exposed as semantic metadata only: current Dryv relation links do not carry the target schema's storage table/namespace override, so this pack does not invent foreign-key SQL.

Schema-qualified table names are emitted as raw `schema.table` identifiers. Database-specific quoting remains caller configuration through normal `next.jdbc` options; Dryv does not choose a database dialect implicitly.

DDL, migrations, foreign-key constraints, defaults and checks remain separate schema/migration concerns.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
