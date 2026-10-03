import { afterEach, describe, expect, mock, test } from "bun:test";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

import UsersViewPage from "./out/app/core/users-view/page.tsx";
import { createUser, createUserInputFields } from "./out/lib/api/core/create-user.ts";
import { UserProfileFields } from "./out/lib/types/user-profile.ts";
import { UserStatus } from "./out/lib/types/user-status.enum.ts";

type Call = { method: string; url: string; body: unknown };
const calls: Call[] = [];

function serve(responses: Record<string, unknown>) {
  calls.length = 0;
  globalThis.fetch = mock(async (input: RequestInfo | URL, init?: RequestInit) => {
    const method = init?.method ?? "GET";
    const url = String(input);
    calls.push({ method, url, body: init?.body === undefined ? undefined : JSON.parse(String(init.body)) });
    return new Response(JSON.stringify(responses[`${method} ${new URL(url, "http://x").pathname}`] ?? {}));
  }) as unknown as typeof fetch;
}

afterEach(cleanup);

describe("generated types and API", () => {
  test("field metadata follows the schema", () => {
    expect(UserProfileFields.find((field) => field.name === "status")).toMatchObject({
      kind: "enum",
      required: true,
      options: Object.values(UserStatus),
    });
    expect(createUserInputFields.request?.length).toBeGreaterThan(0);
  });

  test("an operation sends its method, path and body", async () => {
    serve({ "POST /users": { id: "u1" } });
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.test";
    const created = await createUser({ request: { displayName: "Ada" } as never });
    expect(created).toEqual({ id: "u1" } as never);
    expect(calls[0]).toMatchObject({ method: "POST", url: "https://api.example.test/users", body: { displayName: "Ada" } });
  });
});

describe("generated page", () => {
  test("loads presented results and submits the collect form", async () => {
    serve({ "GET /users": { items: [{ id: "u1", displayName: "Ada" }] }, "POST /users": { id: "u2", displayName: "Grace", status: "active" } });
    render(<UsersViewPage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Users View");
    await waitFor(() => expect(calls.some((call) => call.method === "GET")).toBe(true));

    const form = document.querySelector("form")!;
    for (const input of Array.from(form.querySelectorAll("input"))) {
      if (input.type === "checkbox") continue;
      fireEvent.change(input, { target: { value: input.type === "number" ? "1" : "Grace" } });
    }
    fireEvent.submit(form);
    await waitFor(() => expect(calls.some((call) => call.method === "POST")).toBe(true));
    await waitFor(() => expect(screen.getByText("Grace")).toBeTruthy());
  });
});
