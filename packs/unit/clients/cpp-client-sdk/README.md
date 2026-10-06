# C++ Client SDK pack

Generates a header-only C++20 HTTP client SDK using cpr 1.14 and nlohmann/json 3.12.

The SDK contains generated wire structs, canonical-value enum wrappers, a reusable client transport and one operation function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Repeated query/form values are preserved as repeated pairs.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Non-2xx responses return a structured `ApiError` through a small generated `Result<T>` type.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
