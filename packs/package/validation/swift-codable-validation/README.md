# Swift Codable Validation pack

Generates a dependency-free Swift 6 package containing the shared Dryv Codable wire types plus deterministic validation helpers.

Validation covers collection cardinality, nested schemas, string length/formats/patterns, numeric ranges and simple non-null cross-field invariants. Canonical enum membership is enforced during Codable decoding by the shared enum wrapper.

Swift optionals collapse authored optional and nullable states, so absent-vs-explicit-null cannot always be distinguished without a dedicated presence wrapper. Cross-field invariants that depend on optional/nullable operands are therefore left explicit instead of force-unwrapping data.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
