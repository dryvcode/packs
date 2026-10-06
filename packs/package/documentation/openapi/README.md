# OpenAPI pack

Generates an OpenAPI 3.1 document from Dryv HTTP operations plus referenced JSON Schema Draft 2020-12 documents.

The pack uses the Engine-provided canonical `facets.http.path.effective`; it does not reconstruct application/group route prefixes in templates. This is the semantic gap that previously blocked OpenAPI generation.

The root document maps:

- effective HTTP paths and methods;
- path/query/query-object/header/cookie parameters;
- JSON, form and multipart request bodies;
- declared success status/representation bindings;
- declared HTTP failure statuses;
- operation descriptions, tags and stable semantic IDs.

Schema-valued inputs/outputs reference generated JSON Schema artifacts through normal same-pack planner dependencies. Inline operation fields and primitive outputs are represented directly with OpenAPI 3.1 JSON Schema vocabulary.

Generated OpenAPI/JSON Schema are output artifacts only. They never become Dryv semantic authority and are never read back as Runtime IR.

**Known limitations:** failure links currently do not expose a full failure payload schema in operation context, so failure responses carry status/description/representation but no invented payload schema. Auth/security schemes are also deferred until the Runtime IR exposes an explicit portable security contract.

Verification is deferred while the Dryv Engine is under maintenance.
