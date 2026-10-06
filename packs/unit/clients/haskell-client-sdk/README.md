# Haskell Client SDK pack

Generates a reusable Haskell HTTP client using `http-client-tls` and Aeson.

The package owns canonical Aeson wire models/enums, a reusable `DryvClient`, and one typed IO function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Canonical enum values are represented as validated Aeson `Value` wrappers so Dryv string, number and boolean enums are preserved without forcing Haskell constructor names into the wire contract.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
