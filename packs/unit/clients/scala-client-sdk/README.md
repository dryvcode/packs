# Scala Client SDK pack

Generates a reusable Scala 3.9 client library using the JDK `HttpClient` and Circe.

The package owns canonical-value enum wrappers, Circe wire models, a reusable async `DryvClient`, and one typed operation object per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Optional/nullable values use `Option`; as with normal Circe decoding this does not distinguish every omitted-vs-explicit-null case without a dedicated presence wrapper.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
