# Changelog

## 0.3.0

- Require `property.enum.types` and `property.types` (for example from `inject/types/typescript`) and stop generating enums; DTO fields use the shared named types.

## 0.2.0

- Place enums per IR group (`<group>/dto/enums/`), so groups may reuse an enum name.
- Remove the aggregate `common/dto/index.ts` barrel: groups may reuse short names, and generated code imports DTOs by file.

## 0.1.0

- First release in `dryvcode/packs`, copied from the Dryv repository's example `class-validator` pack.
