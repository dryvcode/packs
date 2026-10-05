# Vapor Backend pack

Generates a reusable Swift 6.4 backend library using stable Vapor 4.

Each Dryv feature becomes a generated service protocol plus a route-registration function. Handwritten business logic implements the service protocol; generated code owns HTTP extraction, semantic-input reconstruction and declared success status handling.

The backend reuses Dryv's pure Codable Swift wire types. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

Auth, middleware and authored failure-to-error mapping are intentionally not invented by the pack.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
