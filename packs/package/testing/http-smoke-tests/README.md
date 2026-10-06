# HTTP Smoke Tests pack

Generates one plain `.http` request file per Dryv HTTP operation.

These files are deliberately dependency-light: they can be opened in common IDE HTTP clients and remain readable as ordinary text. Every request uses the Engine-provided canonical effective HTTP path and includes the operation's declared success statuses as comments.

Dryv defaults are used when available; otherwise deterministic placeholder values are synthesized solely as testing scaffolding. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are represented. Multipart remains an explicit commented gap until file-part semantics exist in Runtime IR.

Verification is deferred while the Dryv Engine is under maintenance.
