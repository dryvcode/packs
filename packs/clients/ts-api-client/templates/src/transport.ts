/** How the client reaches the API. Call `configureApi` once at startup. */
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

/** Every call resolves to a result; it never throws for HTTP errors. */
export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string; error?: unknown };

export interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

let config: ApiConfig = { baseUrl: "" };

export function configureApi(next: ApiConfig): void {
  config = { ...next };
}

function queryString(query: Record<string, unknown> | undefined): string {
  if (query === undefined) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    for (const item of Array.isArray(value) ? value : [value]) params.append(key, String(item));
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

/** Sends one request; used by the generated operation calls. */
export async function request<T>(
  method: string,
  path: string,
  input: { query?: Record<string, unknown>; body?: unknown },
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const send = config.fetch ?? fetch;
  try {
    const response = await send(`${config.baseUrl}${path}${queryString(input.query)}`, {
      method,
      headers: {
        accept: "application/json",
        ...(input.body === undefined ? {} : { "content-type": "application/json" }),
        ...config.headers,
        ...options.headers,
      },
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
      signal: options.signal,
    });
    const text = await response.text();
    const payload: unknown = text ? JSON.parse(text) : null;
    if (response.ok) return { ok: true, status: response.status, data: payload as T };
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as { message: unknown }).message)
        : response.statusText || `HTTP ${response.status}`;
    return { ok: false, status: response.status, message, error: payload };
  } catch (error) {
    return { ok: false, status: 0, message: error instanceof Error ? error.message : String(error), error };
  }
}
