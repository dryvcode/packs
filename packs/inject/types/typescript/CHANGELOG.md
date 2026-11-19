# Changelog

## 0.3.0

- Output moves under `schema/`: `<group>/schema/{enum,type,interface}/`.

## 0.2.0

- Output moves into a folder per kind under the group: `enum/`, `type/` and `interface/`.
- Stored schemas (role `entity`) no longer get an interface; the project's entity types own them.

## 0.1.0

- First release: enums, named primitive/temporal/literal/union/record/tuple/generic/composite types and schema interfaces, providing `property.enum.types`, `property.types` and `schema.types`.
