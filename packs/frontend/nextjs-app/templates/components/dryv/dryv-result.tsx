"use client";

import type { FieldMeta } from "../../lib/dryv/transport.ts";

/**
 * Presents an operation result. With field metadata it shows those fields (optionally only the
 * selected ones); without it, the raw value. Arrays and `items` pages become tables.
 */
export function DryvResult({
  value,
  fields,
  select,
}: {
  value: unknown;
  fields?: readonly FieldMeta[];
  select?: readonly string[];
}) {
  if (value === undefined) return <p className="dryv-empty">Nothing to show yet.</p>;
  const shown = fields?.filter((field) => select === undefined || select.includes(field.name));
  const rows = Array.isArray(value)
    ? value
    : typeof value === "object" && value !== null && Array.isArray((value as { items?: unknown }).items)
      ? (value as { items: unknown[] }).items
      : null;

  if (rows !== null) {
    const columns =
      shown?.map((field) => ({ key: field.name, label: field.label })) ??
      Object.keys((rows[0] as Record<string, unknown> | undefined) ?? {}).map((key) => ({ key, label: key }));
    return (
      <table className="dryv-result">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{display((row as Record<string, unknown>)[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (typeof value !== "object" || value === null) return <p>{display(value)}</p>;
  const record = value as Record<string, unknown>;
  const entries = shown?.map((field) => [field.label, record[field.name]] as const) ?? Object.entries(record);
  return (
    <dl className="dryv-result">
      {entries.map(([label, item]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{display(item)}</dd>
        </div>
      ))}
    </dl>
  );
}

function display(value: unknown): string {
  if (value === null || value === undefined) return "—";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}
