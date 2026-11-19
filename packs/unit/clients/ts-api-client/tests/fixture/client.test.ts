import { afterEach, expect, test } from "bun:test";

import { configureApi, createUser, getUser, listUsers, requestBlob, UserStatus } from "./out/src/index.ts";
import { listUsers as listUsersBySubpath } from "@fixture/api-client/operations/core/list-users";
import type { UserProfile } from "@fixture/api-client/models/user-profile";
import { requestBlob as requestBlobBySubpath } from "@fixture/api-client/transport";

const typedUser: UserProfile = {
  id: "u1",
  displayName: "Ada",
  externalCustomerId: "c1",
  createdAt: "2026-01-01T00:00:00Z",
  status: UserStatus.ACTIVE,
};
void typedUser;

const calls: { url: string; method: string; body: unknown; headers?: HeadersInit }[] = [];
function serve(status: number, body: unknown): void {
  configureApi({
    baseUrl: "https://api.example.test",
    fetch: (async (url: string, init?: RequestInit) => {
      calls.push({
        url,
        method: init?.method ?? "GET",
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
        headers: init?.headers,
      });
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
  await getUser({ id: "4 2", sessionToken: "fixture-session-token" });
  expect(calls[0]?.url).toBe("https://api.example.test/users/4%202");
});

test("contract-bound headers are sent and caller headers remain intact", async () => {
  serve(200, { id: "42" });
  await getUser(
    { id: "42", sessionToken: "fixture-session-token" },
    { headers: { "x-caller-header": "caller-value" } },
  );
  expect(calls[0]?.headers).toMatchObject({
    "x-caller-header": "caller-value",
    "x-session-token": "fixture-session-token",
  });
});

test("errors resolve to a result instead of throwing", async () => {
  serve(404, { message: "not found" });
  const result = await listUsers();
  expect(result).toEqual({ ok: false, status: 404, message: "not found", error: { message: "not found" } });
});

test("generated operations and models resolve through package subpaths", async () => {
  serve(200, [{ id: "u2", displayName: "Grace", status: "active" }]);
  const result = await listUsersBySubpath();
  expect(result.ok).toBe(true);
});

test("credential mode is configured for cookie-authenticated APIs", async () => {
  let credentials: RequestCredentials | undefined;
  configureApi({
    baseUrl: "https://api.example.test",
    credentials: "include",
    fetch: (async (_url: string, init?: RequestInit) => {
      credentials = init?.credentials;
      return new Response("[]", { status: 200 });
    }) as typeof fetch,
  });
  await listUsers();
  expect(credentials).toBe("include");
});

test("binary downloads use the configured fetch and cookie credentials", async () => {
  let requestInit: RequestInit | undefined;
  configureApi({
    baseUrl: "https://api.example.test",
    fetch: (async (_url: string, init?: RequestInit) => {
      requestInit = init;
      return new Response(new Blob(["archive"]), { status: 200 });
    }) as typeof fetch,
  });
  const result = await requestBlob("/projects/p1/archive");
  expect(result.ok && await result.data.text()).toBe("archive");
  expect(requestInit).toMatchObject({ method: "GET", credentials: "include" });
});

test("binary-download helpers resolve through the source wildcard", async () => {
  serve(200, { id: "u2" });
  expect(requestBlobBySubpath).toBe(requestBlob);
  expect((await listUsersBySubpath()).ok).toBe(true);
});
