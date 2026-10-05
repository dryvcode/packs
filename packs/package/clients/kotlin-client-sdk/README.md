# Kotlin Client SDK pack

Generates a Kotlin 2.4.20 JVM SDK using Ktor Client 3.6.0 and kotlinx.serialization 1.11.0.

The SDK is coroutine-first and owns typed serializable DTOs, canonical scalar enum wrappers, a reusable Ktor client transport and one suspend operation function per Dryv HTTP operation. Path, query, query-object, header, cookie, JSON body and URL-encoded form bindings are explicit. Multipart remains unsupported until Dryv has first-class semantic file/multipart meaning.

Required nullable schema fields remain required during kotlinx.serialization decoding because they have no default value. Optional fields use nullable values with a null default, so optional omitted-vs-explicit-null presence remains a documented limitation. Decimal/money, UUID and temporal wire values remain exact strings in this baseline rather than introducing JVM-specific serializers into the shared wire vocabulary.

**Provides:** `operation.client`, `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
