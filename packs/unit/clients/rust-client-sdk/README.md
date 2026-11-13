# Rust Client SDK pack

Generates a reusable async Rust HTTP client package from Dryv HTTP operations.

- `reqwest` owns transport.
- `serde` owns model/enum serialization.
- one generated async function represents each HTTP operation;
- path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are mapped explicitly;
- multipart remains explicit as unsupported until Dryv has a first-class semantic file/multipart contract.

The pack preserves canonical enum wire values with custom serde implementations and uses generated Rust identifiers only as target-language representations. Unknown, dynamic, generic and currently unsupported structural values fall back visibly to `serde_json::Value`.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
