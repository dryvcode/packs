# Axum backend pack

Generates a reusable Rust library for Dryv HTTP operations using Axum and serde.

The generated boundary is intentionally split:

- **models/enums** represent Runtime IR values;
- **service traits** describe handwritten business behavior;
- **routers** own HTTP extraction and response mapping;
- **ApiError** is the handwritten-service error surface translated into Axum responses.

## HTTP mapping

| Runtime IR binding | Axum mapping                                                                          |
| ------------------ | ------------------------------------------------------------------------------------- |
| path               | `Path<T>`                                                                             |
| query              | generated `Query<T>` extractor struct                                                 |
| query-object       | `Query<Model>`                                                                        |
| header             | `HeaderMap` + typed parsing                                                           |
| cookie             | `HeaderMap` + explicit cookie parsing                                                 |
| body               | `Json<T>`                                                                             |
| form               | `Form<T>`                                                                             |
| multipart          | explicit `501 Not Implemented` path until semantic file/multipart mapping is designed |

Successful output mappings preserve their declared HTTP status. Handwritten services return `Result<T, ApiError>`. Declared failure-to-status mappings are not yet represented as a generated Rust error enum; the handwritten service chooses the concrete `ApiError` status, which remains an explicit follow-up rather than hidden inference.

Rust types stay pack-owned mappings. Primitive values use `String`, `bool`, `i64`, `f64`; records use `HashMap<String, serde_json::Value>`; unknown/dynamic and currently unsupported generic/composite forms use `serde_json::Value`. Optional/nullable fields use `Option<T>`; serde alone cannot distinguish a missing required-nullable property from an explicitly null property, so that limitation remains visible rather than becoming new Runtime IR meaning.

Enums use custom serde implementations so string, numeric and boolean canonical enum values can all round-trip instead of assuming Rust variant names are wire values. Rust keywords are escaped or suffixed only in generated identifiers; serde keeps semantic field names on the wire.

**Provides:** `schema.types` and `property.enum.types`.

Set the `crate_name` input to customize the generated Cargo package name. Implement the generated service trait for your application and pass an `Arc` of that implementation to the generated router builder. The application owns authorization, SQL, transactions, and the conversion from domain failures into `ApiError`.

For the shared fixture, the trait is `CoreUserManagementService` and the router builder is `build_core_user_management_router`. Both are exported from the generated crate's `routers` module.

```sh
bun scripts/test-pack.ts --keep unit/backend/axum-backend
```

Set `repositories: true` to generate PostgreSQL execution for operations bound to named queries
or mutations. `persistence::DatabaseService<P>` implements the generated service traits. Supply a
SeaORM connection and `PolicyEvaluator`, and install an authenticated `Caller` through Axum
middleware. Each request obtains trusted policy values, validates input and checks, then executes
in a transaction. Collections are batch loaded after paging root rows; counts and total matching
roots use the same snapshot. Write selectors and root reads always include authored trusted scope.
Writes and returning projections commit together; validation/SQL/decoding failures roll back.

Patch DTOs use `Option<Option<T>>` when a field is optional and nullable. The custom JSON extractor
validates the original body before serde can erase an explicit null. Failure variants and Python
SDK error classes share stable authored codes. Responses use `{code, message, issues?, payload?}`;
SQLSTATE and structured database metadata select explicit declared mappings. Unknown failures
are logged and return a generic 500. An unbound operation still requires a service implementation.
The default `repositories: false` retains the existing handwritten-service interface.

The executable proof is `sdk/_examples/proofs/typed-database` in the Dryv repository. Its
runner contains no SQL/repository implementations. Read that proof's capability limits before
adopting a generated backend. PostgreSQL migrations retain authority over physical column names.
