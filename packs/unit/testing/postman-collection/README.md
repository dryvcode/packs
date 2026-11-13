# Postman Collection pack

Generates a Postman Collection v2.1 JSON document from Dryv HTTP operations.

The collection uses the Engine-provided canonical `facets.http.path.effective`, never reconstructing group/application prefixes in templates. A `baseUrl` collection variable is initialized from the pack input.

Request values are **test scaffolding**:

- authored/default values are used when the operation field exposes them;
- otherwise deterministic placeholder values are synthesized from the field type;
- placeholders are generated output only and never become Runtime IR meaning.

The generated collection covers path, query, query-object, headers, cookies, JSON body and URL-encoded form bindings. Multipart requests are emitted with a descriptive placeholder because Dryv does not yet expose first-class file-part semantics.

Verification is deferred while the Dryv Engine is under maintenance.
