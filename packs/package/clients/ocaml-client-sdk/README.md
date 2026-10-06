# OCaml Client SDK pack

Generates an OCaml client library using Cohttp Lwt 6.3 and Yojson 3.

The package owns plain Yojson wire modules, one Lwt operation function per Dryv HTTP operation, and a reusable request/error layer. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Canonical enums are validated Yojson scalar wrappers, preserving string, numeric and boolean wire values without pretending OCaml constructors are the canonical values.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
