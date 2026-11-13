# Elixir Client SDK pack

Generates an Elixir 1.15+ SDK using Req 0.7.

The SDK owns generated structs, canonical-value enum wrappers, a reusable client module and one operation module per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Repeated query/form values are preserved as repeated key/value pairs.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Non-2xx responses return a structured `ApiError` value.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
