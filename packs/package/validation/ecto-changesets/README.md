# Ecto Changeset Validation pack

Generates Elixir 1.15+ wire structs, canonical-value enum wrappers and reusable Ecto 3.14 changeset validators.

Validators map required/nullability semantics, collection cardinality, string length/formats/patterns, numeric ranges, enum validity and nested generated models. Nested models are delegated to their generated validator modules rather than coupling Ecto schema persistence into the validation DTO.

The shared wire structs preserve Dryv's transport shape. Optional omitted-vs-explicit-null remains the normal map/struct limitation once decoded. Opaque and arithmetic schema invariants are not guessed into Ecto expressions; simple comparison invariants can be lowered separately without changing Runtime IR.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
