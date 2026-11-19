# Crow Backend pack

Generates a reusable C++20 backend library using Crow 1.3.4 and nlohmann/json 3.12.

Each Dryv feature becomes a pure service interface plus a generated route-registration function. Handwritten business logic implements the service; generated code owns Crow routing, request binding, semantic-input reconstruction, JSON encoding and declared success statuses.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Repeated query/form values are preserved. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

Service exceptions are not silently mapped to authored failure semantics; applications keep their own exception/error policy.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
