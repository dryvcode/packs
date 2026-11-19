# Malli Schemas pack

Generates reusable Clojure 1.12.5 Malli 0.20.2 schemas.

Each Dryv schema becomes a Malli `:map` schema plus `valid?` and `explain` helpers. Canonical enum values become `:enum` schemas. The mapping preserves required-vs-optional keys, nullable values, nested schemas, collection cardinality, string lengths/patterns/formats, numeric ranges and simple cross-field invariants.

Clojure values remain idiomatic maps/scalars. This pack is the reusable Clojure schema/type capability consumed conceptually by client/backend code rather than introducing generated record classes.

Opaque invariants and expression forms that cannot be lowered deterministically remain explicit gaps.

**Provides:** `schema.validation`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
