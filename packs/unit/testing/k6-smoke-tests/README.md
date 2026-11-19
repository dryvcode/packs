# k6 Smoke Tests pack

Generates a runnable k6 smoke suite from Dryv HTTP operations.

The suite defaults to one virtual user and one iteration. Each generated request:

- uses the canonical effective route from the Engine;
- fills Dryv defaults where available and otherwise deterministic placeholder values;
- covers path/query/query-object/header/cookie/JSON/form bindings;
- checks the response status against the operation's declared success statuses.

Set `BASE_URL` at runtime to target another environment. Generated placeholders are test scaffolding only and never become Runtime IR semantics.

Multipart operations are skipped with an explicit marker until Dryv has first-class semantic file-part context.

Verification is deferred while the Dryv Engine is under maintenance.
