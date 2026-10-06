# Doctrine ORM Entities pack

Generates a PHP 8.4.1+ Doctrine ORM 3.7 persistence package from Dryv entity schemas.

Mappings include table/schema names, primary and composite keys, system-generated integer keys, indexes/uniqueness, nullability, string lengths, decimal precision, temporal values and JSON-backed structural/enum values.

Dryv scalar foreign-key fields remain mapped as scalar columns. Doctrine cannot portably map the same physical column both as a scalar property and as an owning association without duplicate column ownership, so relation navigation is not fabricated here. Database foreign-key constraints/lifecycle and portable system UUID generation remain explicit persistence/migration gaps rather than changing the canonical schema shape.

Defaults, create-only enforcement and database check constraints likewise belong in a migration/schema layer where their database semantics can be emitted explicitly.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
