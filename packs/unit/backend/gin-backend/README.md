# Gin Backend pack

Generates a reusable Go backend package for Gin 1.12.

Each Dryv feature becomes a typed service interface plus a router-registration function. Generated handlers own HTTP extraction, semantic-input reconstruction and declared success-status mapping; handwritten services own business behavior.

The pack reuses Dryv's shared canonical Go models/enums. It supports effective path routes, query/query-object/header/cookie/JSON/form bindings and structured service errors. Multipart remains HTTP 501 until Dryv exposes first-class file-part semantics.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
