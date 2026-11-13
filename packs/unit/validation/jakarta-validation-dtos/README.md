# Jakarta Validation DTOs pack

Generates a reusable Maven package containing Java DTO classes and enums from Dryv Runtime IR.

The pack stays on the portable Jakarta Validation API. It does not introduce Spring, Hibernate ORM, Jackson, or other framework semantics into Runtime IR.

## Mapping

| Runtime meaning | Java / Jakarta output |
| --- | --- |
| required, non-null field | `@NotNull` |
| optional or nullable field | no presence constraint |
| nested schema | generated DTO + `@Valid` |
| array | `List<T>` + container `@Size`; element constraints use type-use annotations |
| string length | `@Size` |
| string pattern | `@Pattern` |
| email | `@Email` |
| UUID / ULID / E.164 / slug / hex | portable `@Pattern` rules |
| numeric range | `@DecimalMin` / `@DecimalMax` |
| enum | generated Java enum |
| date/time values | Java `java.time` types |
| record/map | `Map<String, Object>` |
| simple schema invariants | generated class-level Jakarta constraint validator |

Optionality and nullability are distinct in Runtime IR but plain Bean Validation validates an already-created Java object. Therefore the validator can enforce nullability but cannot prove whether a missing serialized property was absent versus explicitly null. Serialization-layer presence semantics remain the responsibility of the consuming framework.

Unsupported or target-specific semantics are left visible rather than approximated with hidden conventions.

**Provides:** `schema.validation`, `schema.types`, and `property.enum.types`.

## Package structure

The generated unit owns a Maven `pom.xml`. DTOs and enums are grouped physically by Dryv group and declared under `<java_package>.group_<group>`, keeping Java package segments valid even when a semantic group name collides with a Java keyword. Java member keywords are suffixed in generated identifiers; Runtime IR names remain unchanged.

Verification is intentionally deferred while the Dryv Engine is under maintenance.
