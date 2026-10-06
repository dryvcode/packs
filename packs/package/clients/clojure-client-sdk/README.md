# Clojure Client SDK pack

Generates a Clojure 1.12.5 client library using the JDK `java.net.http.HttpClient` and Jsonista.

Operations are ordinary functions over idiomatic Clojure values/maps. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Responses are decoded to ordinary Clojure data with keyword map keys.

Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning. Non-2xx responses throw `ex-info` with `:status`, `:payload` and the decoded/raw response message.

Clojure's reusable schema/type capability is provided separately by `package/validation/malli-schemas`; the client does not duplicate that semantic layer.

**Provides:** `operation.client`.

Verification is deferred while the Dryv Engine is under maintenance.
