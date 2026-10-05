# Python Client SDK pack

Generates a reusable async Python 3.11+ HTTP client package using HTTPX and Pydantic v2.

The package owns one `DryvClient`, typed Pydantic models/enums/generics and one async function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Pydantic `TypeAdapter` performs typed response decoding.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Non-2xx responses raise `ApiError` with status, message and decoded payload when available.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
