# SeaORM Entities pack

Generates a reusable Rust crate containing SeaORM 2.x dense entity models for Dryv schemas with role `entity`.

Mappings stay target-owned:

- canonical storage name / namespace → SeaORM table / schema attributes;
- primary-key fields → `#[sea_orm(primary_key)]`;
- scalar fields → SeaORM-supported Rust scalar types;
- nullable/optional values → `Option<T>`;
- nested/record/array values without a relational mapping → JSON columns;
- owning relations → scalar foreign-key column plus `BelongsTo<...>`;
- inverse one-to-one / one-to-many relations → `HasOne` / `HasMany`;
- delete/update lifecycle → SeaORM relation actions where the canonical relation declares them.

Enums currently persist their canonical textual representation as `String`. A future typed ActiveEnum layer can be added without changing Runtime IR.

SeaORM entity-derived table creation does not create indexes, so canonical indexes and schema invariants are intentionally not approximated here. They belong in a future SeaORM migration/schema pack that can emit explicit index/check statements.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
