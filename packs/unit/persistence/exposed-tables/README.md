# Exposed Tables pack

Generates a Kotlin/JVM persistence library using JetBrains Exposed 1.5.

Each persistent Dryv schema becomes an Exposed `Table` object. An aggregate `DryvTables` registry exports every generated table without choosing JDBC or R2DBC; the consuming application owns its database driver and transaction runtime.

Mappings include storage table/schema names, scalar and JSON columns, single/composite primary keys, system-generated integer/UUID identifiers, named indexes/uniqueness, nullability, decimal precision, temporal types and real foreign-key constraints. Owning Dryv relations use Exposed `reference` / `optReference` against the generated target table column, preserving the authored scalar FK field while avoiding storage-name guesses. Delete/update lifecycle maps to Exposed `ReferenceOption`.

Arbitrary enums and structural values use JSON storage so canonical scalar enum values are not replaced by Kotlin member names. Decimal/money values without explicit precision+scale fall back to text to preserve exact values instead of choosing an arbitrary database precision.

Portable defaults, create-only enforcement and database check expressions remain migration/schema concerns where Exposed's table DSL cannot represent the authored semantics without target-specific assumptions.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
