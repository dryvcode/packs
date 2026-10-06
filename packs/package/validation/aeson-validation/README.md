# Haskell Aeson Validation pack

Generates a reusable Haskell package of Aeson wire models, canonical enum wrappers and pure validation functions.

Models use explicit `FromJSON` / `ToJSON` instances. Required nullable properties decode with a required key into `Maybe a`; optional properties use optional-key decoding and are omitted when absent. This keeps Dryv's presence/nullability distinction as far as Aeson's ordinary object model allows.

Canonical enums are wrappers over Aeson `Value`, so mixed string/numeric/boolean enum values remain exact wire values instead of being forced into Haskell constructor names.

Generated `validate...` functions cover nested schemas, collection cardinality, string lengths/formats/patterns and numeric ranges. Cross-field invariant lowering is deliberately deferred until optional/null arithmetic and comparison semantics can be emitted without partial functions.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
