# Active Record Models pack

Generates a Ruby 3.2+ persistence library for Active Record 8.1.

Each persistent Dryv schema becomes an ActiveRecord model with:

- canonical table/schema naming;
- simple or composite primary-key configuration;
- generated scalar attribute declarations for portable primitive/temporal/decimal/JSON values;
- scalar Dryv foreign-key fields kept authoritative;
- additive `belongs_to`, `has_one` and `has_many` navigation using explicit `foreign_key` / `primary_key`;
- create-only fields marked readonly;
- JSON-backed structural and arbitrary enum values.

Database indexes, unique constraints, FK constraints/actions, defaults and checks are not fabricated in the model layer. Active Record expresses those through migrations/schema DDL, and Dryv relation links do not currently expose a target schema's storage table override. Those remain explicit migration/context gaps rather than hidden naming assumptions.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
