# Ktor Backend pack

Generates a reusable Kotlin/JVM backend library using Ktor Server 3.6 and kotlinx.serialization 1.11.

Each Dryv feature becomes a coroutine service interface plus a generated `Route` registration extension. Handwritten business behavior implements the service; generated routing owns only HTTP extraction, semantic-input reconstruction and declared success-status mapping.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Binding and JSON decoding failures become HTTP 400 responses inside generated routing. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

The backend reuses the same canonical scalar enum wrappers and serializable DTO vocabulary as the Kotlin client. Service failures, authentication and middleware remain application policy rather than hidden generator behavior.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
