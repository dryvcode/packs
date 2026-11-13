# Sequel Models pack

Generates Ruby 3.3+ persistence code using Sequel 5.109.

The generated model classes do not open database connections. Each class exposes its physical table identifier and schema-definition helpers; the aggregate `Persistence` module accepts a host-supplied `Sequel::Database`, creates tables in a first phase, applies foreign-key constraints in a second phase, and binds model datasets explicitly.

Mappings include storage table/schema names, scalar and JSON-text columns, single/composite primary keys, system integer/UUID identifiers, indexes/uniqueness, nullability, decimal precision and temporal values. Owning relations keep the scalar FK column authoritative and add Sequel associations plus real database FK constraints using the generated target model's physical table constant, so target storage overrides are not guessed.

Structural values and arbitrary enum values use Sequel's JSON serialization plugin over text columns. Database defaults/check expressions and create-only update enforcement remain migration/schema concerns when they cannot be represented portably without target-specific assumptions.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
