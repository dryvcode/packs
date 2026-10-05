# Sinatra Backend pack

Generates a reusable Ruby backend library using Sinatra 4.2.

Each Dryv feature becomes a route-registration module plus a service boundary. The host calls `FeatureRoutes.register(app, service)`, keeping Sinatra application ownership and handwritten business behavior outside generated code.

The backend reuses the same framework-neutral Ruby wire models and canonical enum wrappers as the Ruby client. It explicitly handles path, query, query-object, header, cookie, JSON body and URL-encoded form bindings. Request binding/JSON errors become HTTP 400; service exceptions are not reinterpreted as authored failure semantics. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
