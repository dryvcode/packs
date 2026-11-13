# OCaml Yojson Validation pack

Generates reusable Yojson wire models plus pure OCaml validation functions.

Each schema receives a validator returning a list of human-readable validation errors. The pack maps nested schemas, collection cardinality, canonical enum membership, string length, common formats, regex patterns and numeric ranges. The DTO layer keeps required-nullable distinct from optional during decoding; optional explicit-null and omitted values both become `None`, which is documented rather than hidden.

Cross-field arithmetic/opaque invariants remain explicit future lowering work.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
