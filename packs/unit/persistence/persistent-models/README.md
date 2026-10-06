# Persistent Models pack

Generates Haskell Persistent 2.18 model definitions and one aggregate `Dryv.Persistence` module with `migrateAll`.

The pack preserves authored storage field names, explicit single/composite primary keys, unique constraints, nullability and foreign keys—including relations to non-primary unique fields through `Foreign ... References ...`. Dryv relation lifecycle maps to Persistent `OnDelete*` / `OnUpdate*` actions where declared.

Structural values, arrays and arbitrary enum values use JSON text storage. Decimal/money use exact text rather than floating-point persistence. Temporal values remain text where Runtime IR does not prescribe a timezone/database representation.

Persistent's implicit ID would hide an authored key field, so this pack keeps canonical keys explicit. Portable system-generated key defaults, storage namespaces, non-unique indexes, database defaults/check expressions and create-only enforcement remain migration/schema concerns.

**Provides:** `schema.persistence`.

Verification is deferred while the Dryv Engine is under maintenance.
