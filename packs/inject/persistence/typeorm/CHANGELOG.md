# Changelog

## 0.2.0

- Name relation properties after their foreign-key field (`actingAffiliationId` → `actingAffiliation`), so two keys to the same entity no longer collide.
- Place enums per IR group (`<group>/entities/enums/`) and remove the aggregate `common/entities/index.ts` barrel.

## 0.1.0

- First release in `dryvcode/packs`, copied from the Dryv repository's example `typeorm` pack.
