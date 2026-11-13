# SQLAlchemy Models pack

Generates a Python 3.11+ SQLAlchemy 2.1 declarative persistence package.

Mappings include canonical table/schema names, scalar and JSON columns, primary/composite keys, system-generated integer/UUID keys, indexes/uniqueness, nullability, string lengths, decimal precision and temporal types. Enum fields use SQLAlchemy JSON so canonical string/numeric/boolean enum values remain storage values instead of Python member names.

The current Dryv relation link exposes the target semantic schema/field but not the target schema's storage table/namespace override. Because of that, this pack does **not** invent database `ForeignKey("table.column")` strings. It keeps the scalar FK column authoritative and emits view-only ORM navigation using semantic entity identities. Database FK constraints and lifecycle actions remain an explicit context/migration-pack gap until target storage identity is available.

Defaults, create-only enforcement and database check constraints likewise remain migration/schema concerns when their semantics are not portable at the ORM model layer.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
