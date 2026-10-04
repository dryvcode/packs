import { afterEach, expect, test } from "bun:test";

import { configureApi, createUser, getUser, listUsers, UserStatus } from "./out/src/index.ts";

const calls: { url: string; method: string; body: unknown }[] = [];
function serve(status: number, body: unknown): void {
  configureApi({
    baseUrl: "https://api.example.test",
    fetch: (async (url: string, init?: RequestInit) => {
      calls.push({ url, method: init?.method ?? "GET", body: init?.body ? JSON.parse(String(init.body)) : undefined });
      return new Response(JSON.stringify(body), { status });
    }) as typeof fetch,
  });
}
afterEach(() => {
  calls.length = 0;
});

test("a schema input is sent whole as the body", async () => {
  serve(201, { id: "u1", displayName: "Ada" });
  const result = await createUser({ displayName: "Ada", externalCustomerId: "c1", status: UserStatus.ACTIVE });
  expect(result.ok && result.data.id).toBe("u1");
  expect(calls[0]).toMatchObject({ method: "POST", url: "https://api.example.test/users" });
  expect(calls[0]?.body).toMatchObject({ displayName: "Ada" });
});

test("named input fields fill path parameters", async () => {
  serve(200, { id: "42" });
  await getUser({ id: "4 2" });
  expect(calls[0]?.url).toBe("https://api.example.test/users/4%202");
});

test("errors resolve to a result instead of throwing", async () => {
  serve(404, { message: "not found" });
  const result = await listUsers();
  expect(result).toEqual({ ok: false, status: 404, message: "not found", error: { message: "not found" } });
});
