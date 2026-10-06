# Reitit Backend pack

Generates a Clojure 1.12.5 Ring backend library using Reitit 0.11 and Muuntaja.

Each Dryv feature becomes a route function that accepts a plain service map. Generated code owns HTTP extraction and authored-input reconstruction; handwritten service functions own business behavior. An aggregate `app` function combines every generated feature route into a Ring handler.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Binding/JSON conversion failures return HTTP 400. Service exceptions are not reinterpreted as authored failure semantics. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

The reusable Clojure schema capability lives in `package/validation/malli-schemas`; this backend intentionally does not duplicate it.

Verification is deferred while the Dryv Engine is under maintenance.
