# Go net/http backend pack

Generates a reusable Go backend package using only the standard library.

Each Dryv feature becomes:

- a typed service interface containing handwritten business behavior;
- a registration function that attaches HTTP operations to `http.ServeMux`;
- generated models/enums owned by the backend package.

The pack uses Go 1.23 method-aware ServeMux patterns and `Request.PathValue`. It maps path, query, query-object, header, cookie, JSON body and URL-encoded form bindings explicitly. HTTP decomposition is reconstructed back into the authored operation input before the service is called.

Services return ordinary Go errors. `*HTTPError` carries an explicit status/message/payload; other errors become HTTP 500. Declared Dryv failure mappings are not silently converted into Go error classes.

Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
