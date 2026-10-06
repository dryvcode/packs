# Axum backend pack

Generates a reusable Rust library for Dryv HTTP operations using Axum and serde.

The generated boundary is intentionally split:

- **models/enums** represent Runtime IR values;
- **service traits** describe handwritten business behavior;
- **routers** own HTTP extraction and response mapping;
- **ApiError** is the handwritten-service error surface translated into Axum responses.

## HTTP mapping

| Runtime IR binding | Axum mapping |
| --- | --- |
| path | `Path<T>` |
| query | generated `Query<T>` extractor struct |
| query-object | `Query<Model>` |
| header | `HeaderMap` + typed parsing |
| cookie | `HeaderMap` + explicit cookie parsing |
| body | `Json<T>` |
| form | `Form<T>` |
| multipart | explicit `501 Not Implemented` path until semantic file/multipart mapping is designed |

Successful output mappings preserve their declared HTTP status. Handwritten services return `Result<T, ApiError>`. Declared failure-to-status mappings are not yet represented as a generated Rust error enum; the handwritten service chooses the concrete `ApiError` status, which remains an explicit follow-up rather than hidden inference.

Rust types stay pack-owned mappings. Primitive values use `String`, `bool`, `i64`, `f64`; records use `HashMap<String, serde_json::Value>`; unknown/dynamic and currently unsupported generic/composite forms use `serde_json::Value`. Optional/nullable fields use `Option<T>`; serde alone cannot distinguish a missing required-nullable property from an explicitly null property, so that limitation remains visible rather than becoming new Runtime IR meaning.

Enums use custom serde implementations so string, numeric and boolean canonical enum values can all round-trip instead of assuming Rust variant names are wire values. Rust keywords are escaped or suffixed only in generated identifiers; serde keeps semantic field names on the wire.

**Provides:** `schema.types` and `property.enum.types`.

Verification is intentionally deferred while the Dryv Engine is under maintenance.
