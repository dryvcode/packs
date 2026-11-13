# C++ Validation pack

Generates C++20 wire structs, canonical-value enum wrappers and dependency-light validation helpers.

Validation is plain generated C++ over the authored Dryv semantics: collection/string length, numeric range, regex/string formats, enum validity, nested models and simple non-arithmetic schema invariants. Validators return structured `ValidationResult` values instead of throwing for ordinary validation failure.

The wire model is shared with the C++ client/backend packs. Optional or nullable values use `std::optional`; as with ordinary decoded value types, optional omitted-vs-explicit-null is not retained after deserialization.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
