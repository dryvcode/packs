# Swift Client SDK pack

Generates a dependency-free Swift 6 package using Foundation `URLSession`, async/await and Codable wire types.

The SDK owns canonical-value enum wrappers, typed models, a reusable `DryvClient`, and one async function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Temporal values are represented as canonical wire strings rather than assuming one Foundation date encoding for date-only, time-only, instant and zoned forms. Decimal/money values use `Decimal`. Optional and nullable fields both use Swift optionals; synthesized Codable therefore cannot distinguish every absent-vs-explicit-null case without a dedicated presence wrapper, which remains a documented limitation.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
