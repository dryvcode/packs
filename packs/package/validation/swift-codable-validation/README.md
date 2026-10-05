# Swift Codable Validation pack

Generates a dependency-free Swift 6 package containing the shared Dryv Codable wire types plus deterministic validation helpers.

Validation covers collection cardinality, nested schemas, string length/formats/patterns, numeric ranges and simple non-null cross-field invariants. Canonical enum membership is enforced during Codable decoding by the shared enum wrapper.

Generated Codable models explicitly reject a missing key for required nullable fields while accepting an explicit `null`. Optional fields still collapse omitted and explicit-null states after decoding, so constraints that require distinguishing those two optional states remain a documented presence-wrapper gap. Cross-field invariants that depend on optional/nullable operands are left explicit instead of force-unwrapping data.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
