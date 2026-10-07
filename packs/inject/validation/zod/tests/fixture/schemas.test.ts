import { describe, expect, test } from "bun:test";

import { RegisterRequestSchema, type RegisterRequest } from "./out/index.ts";

const valid = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "+254 712 345 678",
  avatar: "https://example.com/ada.png",
  password: "correct-horse",
  confirmPassword: "correct-horse",
  age: 36,
  birthDate: "1815-12-10",
  tags: ["math", "poetry"],
  address: { city: "London", postalCode: "12345" },
};

function issues(input: Record<string, unknown>): string[] {
  const result = RegisterRequestSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
}

describe("generated zod schemas", () => {
  test("parse a valid registration and apply defaults", () => {
    const parsed: RegisterRequest = RegisterRequestSchema.parse(valid);
    expect(parsed.role).toBe("member");
  });

  test("optional fields may be left out", () => {
    const { phone: _phone, avatar: _avatar, birthDate: _birthDate, ...required } = valid;
    expect(issues(required)).toEqual([]);
  });

  test("reject each field-level rule at its path", () => {
    expect(issues({ ...valid, email: "nope" })).toEqual(["email"]);
    expect(issues({ ...valid, firstName: "" })).toEqual(["firstName"]);
    expect(issues({ ...valid, age: 12 })).toEqual(["age"]);
    expect(issues({ ...valid, age: 20.5 })).toEqual(["age"]);
    expect(issues({ ...valid, role: "owner" })).toEqual(["role"]);
    expect(issues({ ...valid, birthDate: "10/12/1815" })).toEqual(["birthDate"]);
    expect(issues({ ...valid, tags: [] })).toEqual(["tags"]);
    expect(issues({ ...valid, tags: ["x"] })).toEqual(["tags.0"]);
    expect(issues({ ...valid, address: { city: "London", postalCode: "E1" } })).toEqual([
      "address.postalCode",
    ]);
  });

  test("enforce the passwordsMatch invariant on confirmPassword", () => {
    const result = RegisterRequestSchema.safeParse({ ...valid, confirmPassword: "nope-nope" });
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => [issue.path.join("."), issue.message])).toEqual([
      ["confirmPassword", "Passwords must match"],
    ]);
  });
});
