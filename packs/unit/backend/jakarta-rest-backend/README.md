# Jakarta REST backend pack

Generates a reusable Java 17+ backend library using Jakarta REST 4.0.

The generated resource for each Dryv feature owns HTTP mechanics while a nested `Service` interface is the handwritten business boundary. Resources can be instantiated directly with a service implementation and registered with any Jakarta REST runtime.

Supported mappings:

- path → `@PathParam`
- query → `@QueryParam`
- query-object → one `@QueryParam` per schema field, reconstructed into the generated model
- header → `@HeaderParam`
- cookie → `@CookieParam`
- JSON body → entity parameter with `@Consumes(application/json)`
- form → `@FormParam`, reconstructed into the semantic input model when needed
- output → explicit `Response.status(...)`

Multipart remains explicit as `501 Not Implemented` until Dryv has first-class semantic file/multipart meaning. Service failures may throw Jakarta REST `WebApplicationException` or application exceptions; a generated failure hierarchy is deferred rather than inferred from status mappings.

The backend owns Jackson models so it is standalone. It does not secretly activate or depend on the separate Jakarta Validation DTO pack.

**Provides:** `schema.types`, `property.enum.types`.

Verification is deferred while the Dryv Engine is under maintenance.
