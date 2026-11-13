# Rust Validator DTOs pack

Generates serde DTOs with `validator` 0.21 derive constraints.

Mappings include nested validation, collection/string length, numeric ranges, email/URL formats and regex-backed canonical patterns. Generated enums preserve canonical wire values through serde, so invalid enum values fail deserialization before DTO validation. Primitive-array element constraints are not currently repeated element-by-element because `validator` has no general native `each` mapping equivalent; array cardinality is enforced and nested-schema arrays validate recursively.

Rust/serde cannot distinguish every presence/nullability combination with a plain `Option<T>`: specifically an optional non-null field and an explicitly null value collapse to the same representation. The pack documents that limitation instead of inventing Runtime IR meaning.

Simple cross-field invariants are intentionally deferred until they can be represented without generating opaque custom validation conventions.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
