/** Sends one request to the application's HTTP API. Set NEXT_PUBLIC_API_URL to its base URL. */
export async function send(
  method: string,
  path: string,
  options: { query?: Record<string, unknown>; body?: unknown } = {},
): Promise<unknown> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = new URL(path, base === "" ? "http://localhost" : base);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  const response = await fetch(base === "" ? `${url.pathname}${url.search}` : url, {
    method,
    headers: options.body === undefined ? undefined : { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  if (!response.ok) throw new Error(`${method} ${path} failed with ${response.status}`);
  const text = await response.text();
  return text === "" ? undefined : JSON.parse(text);
}

/** Field metadata generated for each schema, used by DryvForm and DryvResult. */
export type FieldMeta = {
  name: string;
  label: string;
  kind: "string" | "number" | "boolean" | "enum" | "date" | "other";
  required: boolean;
  options?: readonly string[];
};
