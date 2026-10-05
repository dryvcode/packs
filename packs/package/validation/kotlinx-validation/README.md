# Kotlinx Validation pack

Generates Kotlin 2.4.20 JVM DTOs using kotlinx.serialization 1.11 plus deterministic validator objects generated from Dryv constraints.

The pack reuses the same canonical Kotlin enum wrappers and wire-model vocabulary as the Ktor client/backend. Validators cover nested schemas, collection cardinality, enum membership, string length, common formats, regular-expression patterns, numeric ranges and simple non-null cross-field invariants.

Required nullable properties remain required during deserialization because generated DTOs omit default values for them. Optional properties default to null, so omitted-vs-explicit-null presence remains a documented kotlinx.serialization limitation. Decimal/money wire values remain exact strings and numeric constraints parse them with `BigDecimal` inside validation.

Arithmetic or null-dependent invariants are not guessed into opaque helper conventions; they remain an explicit follow-up.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
