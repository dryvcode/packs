# C# Client SDK pack

Generates a reusable .NET 10 SDK using the standard `HttpClient` and `System.Text.Json`.

The generated SDK owns typed models, canonical-value enum wrappers, a reusable `DryvClient`, and one static operation class per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Unknown/dynamic/generic structural values map visibly to `JsonElement`. Optional or nullable fields use nullable C# types; plain JSON deserialization cannot distinguish every absent-vs-null combination without an explicit presence wrapper, so that limitation remains documented rather than becoming new Runtime IR semantics.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
