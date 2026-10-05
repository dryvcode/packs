# Phoenix Backend pack

Generates an Elixir 1.15+ Phoenix 1.8 JSON backend library.

Each Dryv feature becomes:

- a generated service behaviour for handwritten application/domain logic;
- a controller that owns only HTTP binding and success-response mapping;
- a router macro `routes(ServiceModule)` that explicitly binds the service module through Phoenix route-private data.

No application environment lookup, install-order coupling or generated-path convention is used for service binding.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are mapped to the authored operation input before the service callback. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning. Service failures are raised to the consuming Phoenix application's normal error handling rather than being reinterpreted as authored failure semantics.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
