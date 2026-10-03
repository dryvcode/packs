import { beforeEach, describe, expect, mock, test } from "bun:test";

// The bridge's server client needs a live Next.js request; record calls instead.
type Call = { method: string; path: string; body?: unknown; options?: Record<string, unknown> };
const calls: Call[] = [];
const respond = (method: string) => async (path: string, ...rest: unknown[]) => {
  const [body, options] = method === "get" ? [undefined, rest[0]] : [rest[0], rest[1]];
  calls.push({ method, path, body, options: options as Record<string, unknown> });
  return { success: true, message: "ok", body: { id: "u1" }, status: 200 };
};
mock.module("server-only", () => ({}));
mock.module("next-api-bridge", () => ({
  createNextApiBridge: () => ({
    get: respond("get"),
    post: respond("post"),
    put: respond("put"),
    patch: respond("patch"),
    delete: respond("delete"),
  }),
}));
const redirects: string[] = [];
mock.module("next/navigation", () => ({
  redirect: (path: string) => {
    redirects.push(path);
  },
}));

const { createUser, createUserAction } = await import("./out/actions/core/create-user.actions.ts");
const { getUser } = await import("./out/actions/core/get-user.actions.ts");
const { listUsers } = await import("./out/actions/core/list-users.actions.ts");
const { coreRoutes } = await import("./out/routes/index.ts");

beforeEach(() => {
  calls.length = 0;
  redirects.length = 0;
});

describe("generated server actions", () => {
  test("send the operation's method, path and body", async () => {
    const response = await createUser({ body: { displayName: "Ada" } as never });
    expect(response).toMatchObject({ success: true, body: { id: "u1" } });
    expect(calls[0]).toMatchObject({ method: "post", path: "/users", body: { displayName: "Ada" } });
  });

  test("interpolate path parameters", async () => {
    await getUser({ params: { id: "42" } });
    expect(calls[0]).toMatchObject({ method: "get", path: "/users/42" });
  });

  test("operations without inputs take no arguments", async () => {
    await listUsers();
    expect(calls[0]).toMatchObject({ method: "get", path: "/users" });
  });

  test("routes are typed strings and functions", () => {
    expect(coreRoutes.listUsers).toBe("/users");
    expect(coreRoutes.getUser({ id: "7" })).toBe("/users/7");
  });
});

describe("generated form actions", () => {
  test("clean control fields, call the operation and redirect on success", async () => {
    const data = new FormData();
    data.set("displayName", "Grace");
    data.set("sessionData", "{}");
    data.set("__delete", "sessionData");
    data.set("__redirect_path", "/users");
    const result = await createUserAction(null, data);
    expect(calls[0]?.body).toEqual({ displayName: "Grace" });
    expect(result.formdata).toEqual({ displayName: "Grace" } as never);
    expect(redirects).toEqual(["/users"]);
  });
});
