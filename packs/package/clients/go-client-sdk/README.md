# Go client SDK pack

Generates a framework-free Go package from Dryv HTTP operations using the standard library.

| IR | Generated |
| --- | --- |
| schema | `<schema>_model.go`: a typed Go struct |
| enum | `<enum>_enum.go`: a named Go type and constants |
| HTTP operation | `<operation>_operation.go`: one typed client function |
| — | `client.go` transport and `go.mod` |

Each operation function accepts `context.Context`, a configured `*Client`, and one generated input value when the operation has input. Schema inputs use the generated schema type. Named input fields use an operation-specific input struct.

HTTP bindings are translated by the pack:

- path → escaped URL path segments
- query / query-object → URL query values
- header → request headers
- cookie → request cookies
- body → JSON request body
- form → URL-encoded form body

The initial pack does not claim multipart/file or streaming support. Those remain explicit follow-up tasks rather than hidden approximations.

Successful responses decode JSON into the generated output type. Non-2xx responses return `*APIError`.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

The pack owns `go.mod`; use `module_path` to set its module path and `package_name` for the Go package identifier.

**Test:** `bun scripts/test-pack.ts package/clients/go-client-sdk` renders the fixture and runs `go test ./...`.
