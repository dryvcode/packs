# Java Client SDK pack

Generates a reusable Maven SDK from Dryv HTTP operations.

The transport uses the JDK standard `java.net.http.HttpClient`; Jackson handles JSON models and canonical enum wire values. Each HTTP operation is emitted as one generated class with a static `execute(...)` method.

Supported bindings are path, query, query-object, header, cookie, JSON body and URL-encoded form. Multipart remains explicitly unsupported until Dryv has a first-class semantic file/multipart contract.

Unknown, dynamic, generic and currently unsupported structural values map visibly to `Object` rather than creating Java-specific Runtime IR.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
