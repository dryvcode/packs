# Cohttp Backend pack

Generates an OCaml backend library using stable Cohttp Lwt 6.3 and Yojson 3.

Each Dryv feature becomes a generated service record plus a list of route records. A shared dispatcher performs method/path matching, captures Dryv path variables, parses HTTP bindings, reconstructs the authored semantic input, and writes the declared success status. Handwritten application behavior is supplied through the service record.

Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

The backend reuses exactly the same Yojson model/enum files as the OCaml client and validation packs.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
