import { afterEach, describe, expect, mock, test } from "bun:test";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

// next-api-bridge needs a live Next.js request; record its calls instead.
type BridgeCall = { method: string; path: string; body?: unknown };
const bridgeCalls: BridgeCall[] = [];
const bridge = (method: string) => async (path: string, ...rest: unknown[]) => {
  bridgeCalls.push({ method, path, body: method === "get" ? undefined : rest[0] });
  const body = method === "get" ? { items: [{ id: "u1", displayName: "Ada" }] } : { id: "u2", displayName: "Grace" };
  return { success: true, message: "OK", body, status: 200 };
};
mock.module("server-only", () => ({}));
mock.module("next/navigation", () => ({ redirect: () => undefined }));
mock.module("next-api-bridge", () => ({
  createNextApiBridge: () => ({ get: bridge("get"), post: bridge("post"), put: bridge("put"), patch: bridge("patch"), delete: bridge("delete") }),
}));

const { default: UsersViewPage } = await import("./out/web/app/core/users-view/page.tsx");
const { default: BridgedUsersViewPage } = await import("./out/web-bridge/app/core/users-view/page.tsx");
const { createUser, createUserInputFields, createUserRequest } = await import("./out/web/lib/api/core/create-user.ts");
const { UserProfileFields } = await import("./out/web/lib/types/user-profile.ts");
const { UserStatus } = await import("./out/web/lib/types/user-status.enum.ts");

type FetchCall = { method: string; url: string; body: unknown };
const fetchCalls: FetchCall[] = [];
function serve(responses: Record<string, unknown>) {
  fetchCalls.length = 0;
  globalThis.fetch = mock(async (input: RequestInfo | URL, init?: RequestInit) => {
    const method = init?.method ?? "GET";
    const url = String(input);
    fetchCalls.push({ method, url, body: init?.body === undefined ? undefined : JSON.parse(String(init.body)) });
    return new Response(JSON.stringify(responses[`${method} ${new URL(url, "http://x").pathname}`] ?? {}));
  }) as unknown as typeof fetch;
}

async function fillAndSubmit() {
  const form = document.querySelector("form")!;
  for (const input of Array.from(form.querySelectorAll("input"))) {
    if (input.type === "checkbox") continue;
    fireEvent.change(input, { target: { value: input.type === "number" ? "1" : "Grace" } });
  }
  fireEvent.submit(form);
}

afterEach(cleanup);

describe("own calls (no operation.client bound)", () => {
  test("field metadata follows the schema", () => {
    expect(UserProfileFields.find((field) => field.name === "status")).toMatchObject({
      kind: "enum",
      required: true,
      options: Object.values(UserStatus),
    });
    expect(createUserInputFields.request?.length).toBeGreaterThan(0);
  });

  test("requests map ports to HTTP parts and calls follow the client convention", async () => {
    serve({ "POST /users": { id: "u1" } });
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.test";
    const response = await createUser(createUserRequest({ request: { displayName: "Ada" } as never }));
    expect(response).toMatchObject({ success: true, status: 200, body: { id: "u1" } });
    expect(fetchCalls[0]).toMatchObject({ method: "POST", url: "https://api.example.test/users", body: { displayName: "Ada" } });
  });

  test("the page loads presented results and submits the collect form", async () => {
    serve({ "GET /users": { items: [{ id: "u1", displayName: "Ada" }] }, "POST /users": { id: "u2", displayName: "Grace", status: "active" } });
    render(<UsersViewPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Users View");
    await waitFor(() => expect(fetchCalls.some((call) => call.method === "GET")).toBe(true));
    await fillAndSubmit();
    await waitFor(() => expect(fetchCalls.some((call) => call.method === "POST")).toBe(true));
    await waitFor(() => expect(screen.getByText("Grace")).toBeTruthy());
  });
});

describe("bound to next-api-bridge", () => {
  test("the page calls the bridge's server actions instead of fetch", async () => {
    serve({});
    bridgeCalls.length = 0;
    render(<BridgedUsersViewPage />);
    await waitFor(() => expect(bridgeCalls.some((call) => call.method === "get" && call.path === "/users")).toBe(true));
    await waitFor(() => expect(screen.getByText("Ada")).toBeTruthy());
    await fillAndSubmit();
    await waitFor(() => expect(bridgeCalls.some((call) => call.method === "post")).toBe(true));
    await waitFor(() => expect(screen.getByText("Grace")).toBeTruthy());
    expect(fetchCalls).toHaveLength(0);
  });
});
