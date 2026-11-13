# Scotty Backend pack

Generates a Haskell backend library using Scotty 0.30 and Aeson.

Each Dryv feature becomes a service record of handwritten IO functions plus generated route registration. Generated code owns HTTP binding and declared success status only; application/domain behavior remains in the supplied service implementation.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are mapped explicitly. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning. The backend reuses the same Aeson model/enum templates as the Haskell client and validation packs.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
