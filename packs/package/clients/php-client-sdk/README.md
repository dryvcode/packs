# PHP Client SDK pack

Generates a PHP 8.4+ SDK using Guzzle 8.2.

The SDK owns plain typed DTOs, canonical-value enum wrappers, a reusable `DryvClient`, and one operation class per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

DTOs use generated `fromArray()` / `toArray()` methods so the same wire representation can be reused by the Symfony backend without requiring a serializer framework.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
