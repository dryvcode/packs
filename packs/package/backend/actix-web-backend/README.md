# Actix Web Backend pack

Generates a reusable Rust backend library for Actix Web 4.15 / Rust 1.88+.

Each Dryv feature becomes an async service trait plus a route-configuration function. Generated handlers own HTTP extraction, semantic-input reconstruction and declared success-status serialization. Handwritten services own business behavior.

The pack reuses the shared Dryv serde model/enum templates. It supports canonical effective routes plus path, query, query-object, header, cookie, JSON body and URL-encoded form bindings. Multipart is returned as HTTP 501 until Dryv exposes first-class file-part semantics.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
