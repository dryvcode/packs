# Spring Boot Backend pack

Generates a reusable Java 17+ backend library for Spring Boot 4.1 / Spring MVC.

Each Dryv feature becomes a service interface and `@RestController`. Generated controllers own only HTTP extraction, canonical semantic-input reconstruction and declared success-status mapping. Handwritten services own business behavior.

The pack reuses the shared Jackson model/enum vocabulary already used by the Java client and Jakarta REST backend. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Canonical enum wire values are decoded through Jackson rather than Spring's enum-name converter. Multipart remains HTTP 501 until Dryv exposes first-class file-part semantics.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
