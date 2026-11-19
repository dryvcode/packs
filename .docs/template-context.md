# Template context conventions

Status: **decided**. Authority: Dryv's [derived context reference](https://github.com/dryvcode/dryv/blob/main/.docs/reference/context/derived.md).

## Naming

| Kind | Style | Examples |
| --- | --- | --- |
| Dryv-known keys in `dryv.yaml` / `dryv.pack.yaml` | snake_case | `default_action`, `install_dependencies` |
| Pack input names (read as `pack.inputs.<name>`) | snake_case | `naming_strategy` |
| Template context paths | snake_case | `field.query.allow_nested`, `relation.on_delete` |
| Dryv-known values | kebab-case or dot-case | `create-only`, `many-to-one`, `schema.validation` |
| Your own template, selection and destination keys | one word, or kebab-case | `entity`, `feature-index` |

## Prefer derived context

Templates read derived facts instead of rebuilding them:

| Instead of | Read |
| --- | --- |
| `value.kind == 'schema'`, `value.property.kind == 'enum'` | `value.is.schema`, `value.is.enum` |
| `primitive.type == 'boolean'`, `primitive.format == 'uuid'` | `primitive.is.boolean`, `primitive.is.uuid` |
| `temporal.kind == 'date-time'` | `temporal.is.date_time` |
| `binding.kind == 'path'`, `relation.cardinality == 'many-to-one'` | `binding.is.path`, `relation.is.many_to_one` |
| `length.min is not none` | `length.has_min` |
| a value through `| tojson` (logic-light renderers) | `default.value_json`, `pattern.match_json[]` |
| scanning `file.dependencies` for a subject's symbol | `value.generated.schema_validation.symbol` |

Keep target mappings (Zod calls, decorators, column types) in the pack. Comparisons without a derived flag (`default.kind`, `input.kind`, `part.kind`) stay as they are.

Discover any path with `dryv context show "<path>"`.
