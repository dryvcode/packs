# ASP.NET Core Backend pack

Generates a reusable .NET 10 backend library using ASP.NET Core endpoint mappings and System.Text.Json.

Each Dryv feature becomes a generated service interface plus an endpoint-registration extension. Handwritten business behavior is provided through normal ASP.NET Core dependency injection; generated code owns HTTP extraction, semantic-input reconstruction and declared success-status mapping only.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning. Non-service exceptions are not silently mapped to authored failure semantics; application exception policy remains outside the generated semantic boundary.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
