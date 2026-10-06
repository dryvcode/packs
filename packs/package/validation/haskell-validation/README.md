# Haskell Validation pack

Generates reusable Aeson models and pure validation helpers from Dryv Runtime IR.

Each schema exposes `validate<Model> :: Model -> [Text]`. Generated validation covers nested models, collection cardinality, string lengths, common formats, regex patterns and numeric ranges while canonical enum membership is enforced during Aeson decoding.

Optional and nullable values share `Maybe` at the Haskell model layer, so omitted-vs-explicit-null is intentionally not claimed as distinguishable without a dedicated presence wrapper. Complex arithmetic/opaque invariants remain explicit future lowering work.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
