# FluentValidation DTOs pack

Generates .NET 10 System.Text.Json DTOs, canonical-value enum wrappers and FluentValidation 12 validators.

The pack maps nullability/presence, nested schemas, collection cardinality, string length, email/URL formats, regular-expression patterns, numeric ranges, enum membership and simple cross-field invariants. Collection element validation uses `RuleForEach`; nested DTOs use generated child validators.

Plain nullable C# properties cannot distinguish every absent-vs-explicit-null JSON case without a dedicated presence wrapper. That limitation remains explicit and is not converted into new Runtime IR semantics.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
