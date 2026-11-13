# dry-validation Contracts pack

Generates framework-neutral Ruby models plus dry-validation 1.11 contracts.

The contract schema enforces authored key presence while generated rules handle nested schemas, collection cardinality, canonical enum membership, string length/formats/patterns, numeric ranges and conservative cross-field invariants. This deliberately avoids treating Ruby truthiness or dry-validation's `filled` predicate as equivalent to Dryv requiredness for values such as `false` or `0`.

Nested DTOs delegate to generated child contracts. Optional and nullable values remain distinguishable at the input-hash level; converting to the generated DTO then follows the shared Ruby wire-model rules.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
