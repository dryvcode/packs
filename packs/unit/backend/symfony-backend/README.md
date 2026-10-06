# Symfony Backend pack

Generates a PHP 8.4.1+ Symfony 8.1 backend library.

Each Dryv feature becomes a generated service interface and Route-attribute controller. Handwritten business behavior implements the service interface; generated controllers own only HTTP extraction, semantic-input reconstruction and declared success-status mapping.

The backend reuses the same plain PHP DTO/enum wire vocabulary as the PHP client. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains HTTP 501 until Dryv has first-class semantic file/multipart meaning.

Auth, middleware and authored failure-to-exception mapping are intentionally not invented by the pack.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
