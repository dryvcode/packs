# Go Validator DTOs pack

Generates Go DTOs and enums backed by `github.com/go-playground/validator/v10`.

The pack uses native validator tags for required values, length/cardinality, ranges, email and URL rules. Canonical enum values, Dryv patterns and selected string formats use generated custom validator registrations local to each DTO so validation remains deterministic without inventing Runtime IR fields.

Nested schema values use validator's nested struct traversal; slices of nested schemas use `dive`. Optional/nullable values use pointers and `omitempty`. As with normal Go JSON decoding, an optional non-null field cannot distinguish an absent property from an explicit JSON null without a custom presence wrapper; that limitation remains explicit.

Simple cross-field invariants are not yet lowered to validator struct-level functions. They remain a documented validation gap rather than hidden conventions.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
