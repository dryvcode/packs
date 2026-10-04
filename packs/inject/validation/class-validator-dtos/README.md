# class-validator DTOs pack

Generates one DTO class per schema, validated with `class-validator` and nested with `class-transformer`.

| IR | Generated |
| --- | --- |
| optional / nullable | `@IsOptional()` / `@ValidateIf(o => o.x !== null)` |
| string, number (`integer`), boolean | `@IsString()`, `@IsNumber()` (`@IsInt()`), `@IsBoolean()` |
| string formats | `@IsUUID`, `@IsEmail`, `@IsUrl`, `@IsFQDN`, `@IsIP`, `@IsHexColor`, `@IsBase64`, `@IsJWT`, `@IsSemVer`, `@IsLocale`, `@IsISO31661Alpha2`, `@IsISO4217CurrencyCode`, `@IsJSON`, … Loose `phone`, strict `e164`, `slug` and `ulid` use `@Matches`. Text-like formats (`markdown`, `html`, paths, …) stay `@IsString()` |
| length, pattern `match` | `@Length` / `@MinLength` / `@MaxLength`, `@Matches(new RegExp(...))` |
| range, multiple of | `@Min` / `@Max`, `@IsDivisibleBy` |
| enums | `@IsEnum(Enum)` with the generated enum |
| temporal | `@IsISO8601()` (strict for dates) |
| nested schemas, arrays | `@ValidateNested()` + `@Type(() => XDto)`; `@IsArray()`, `@ArrayMinSize` / `@ArrayMaxSize`, element rules with `{ each: true }` |
| schema invariants | `@Satisfies<XDto>((object) => ..., { message })` on the first field the rule reads; opaque rules are noted in the class comment |

Pattern `starts`, `ends`, `allow` and `deny` aren't rendered yet.

**Provides:** `schema.validation` and `schema.types` (the DTO classes) and `property.enum.types` (enums).

**Test:** `bun scripts/test-pack.ts inject/validation/class-validator-dtos` renders `tests/fixture` (a registration request), typechecks it, and runs `validate()` on valid and invalid samples, including the passwords-match invariant.

## Use it

The [executable Usage fixture](tests/fixture/dryv.yaml) shows the current source collection, destination and pack activation for this pack.

## Slots

- provides `schema.validation`
- provides `schema.types`
- provides `property.enum.types`
