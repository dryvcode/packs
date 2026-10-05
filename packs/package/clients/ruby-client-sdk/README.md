# Ruby Client SDK pack

Generates a Ruby 4-compatible client SDK using the standard library `Net::HTTP`.

The SDK owns framework-neutral wire models, canonical scalar enum wrappers, a reusable `DryvClient`, structured `ApiError`, and one operation class per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Dryv decimal/money values remain exact strings on the wire rather than being silently narrowed through Ruby Float. Dynamic/record values remain ordinary Ruby Hash/Array/scalar values.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
