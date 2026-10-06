# Scala Circe Validation pack

Generates reusable Scala 3.9 Circe models plus pure validation functions.

The generated validators cover nested schemas, collection cardinality, string length/formats/patterns, numeric ranges and simple non-arithmetic cross-field invariants. Canonical enum values are enforced by the shared Circe enum decoder.

Optional/nullable values use `Option`, so plain Circe decoding does not distinguish every omitted-vs-explicit-null case without a dedicated presence wrapper. Arithmetic invariants and multipart/file semantics remain explicit gaps rather than being approximated.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
