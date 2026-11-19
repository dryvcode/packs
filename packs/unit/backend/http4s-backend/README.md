# http4s Backend pack

Generates a reusable Scala 3.9/http4s 0.23 route library.

Each Dryv feature becomes a service trait plus `HttpRoutes[IO]`. Generated routes own HTTP matching, extraction, semantic-input reconstruction and declared success statuses; handwritten services own business behavior.

The package reuses the same Circe wire types as the Scala client/validation packs. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains HTTP 501 until Dryv has first-class file/multipart semantics.

The route helper parses URL/form encoding itself so generated semantics do not depend on hidden framework matcher conventions.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
