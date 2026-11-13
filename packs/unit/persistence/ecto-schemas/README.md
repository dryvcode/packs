# Ecto Schemas pack

Generates Elixir 1.15+ Ecto 3.14 schema modules for Dryv entity schemas.

Mappings include canonical source/prefix names, simple/composite primary keys, system integer/UUID key strategies, nullability-aware field types, decimal/temporal values, JSON-text storage for arbitrary enum/structural values, and additive `belongs_to` / `has_one` / `has_many` navigation.

Owning relations use `define_field: false`, so the authored Dryv scalar FK field remains authoritative rather than being replaced by an Ecto association field.

Indexes, unique constraints, database FK constraints/actions, defaults and checks are migration/schema DDL concerns. Dryv's current relation target link also does not expose the target schema's storage-name override, so this pack does not invent database constraint targets.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
