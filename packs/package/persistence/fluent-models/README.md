# Fluent Models pack

Generates a Swift 6.4 persistence library using Vapor Fluent 4.13.

Each persistent Dryv schema becomes a Fluent `Model` plus an `AsyncMigration`. Migrations preserve table/schema-space names, single/composite identifiers, unique constraints, scalar/JSON fields and foreign-key lifecycle actions. Scalar FK fields remain authoritative in the model; navigation wrappers are not fabricated on top of the same physical column.

Fluent has no portable non-unique index builder, so ordinary indexes remain an explicit driver/migration gap. Decimal and money values are stored as exact strings because Fluent has no portable decimal schema type; this avoids precision loss. Database defaults, checks and create-only enforcement remain explicit migration/application gaps where Fluent lacks target-neutral semantics.

Entities without a declared primary key emit a generated Swift `#error` rather than receiving a synthetic ID.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
