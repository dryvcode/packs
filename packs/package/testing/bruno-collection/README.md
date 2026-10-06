# Bruno Collection pack

Generates a Bruno collection using the current OpenCollection YAML format.

The pack writes:

- `opencollection.yml`;
- a `Local` environment containing `baseUrl`;
- one YAML request per Dryv HTTP operation;
- response-status assertions matching the operation's declared success statuses.

Routes use the Engine-provided canonical `facets.http.path.effective`. Request values are deterministic generated scaffolding unless authored/default values are available; generated placeholders never become Runtime IR semantics.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are represented. Multipart is emitted with a disabled explanatory text part until Dryv exposes first-class file-part semantics.

Verification is deferred while the Dryv Engine is under maintenance.
