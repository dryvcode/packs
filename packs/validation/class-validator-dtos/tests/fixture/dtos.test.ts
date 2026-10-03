import "reflect-metadata";
import { describe, expect, test } from "bun:test";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { RegisterRequestDto } from "./out/index.ts";

const valid = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "+254 712 345 678",
  avatar: "https://example.com/ada.png",
  password: "correct-horse",
  confirmPassword: "correct-horse",
  age: 36,
  role: "member",
  birthDate: "1815-12-10",
  tags: ["math", "poetry"],
  address: { city: "London", postalCode: "12345" },
};

async function failures(input: Record<string, unknown>): Promise<string[]> {
  const errors = await validate(plainToInstance(RegisterRequestDto, input));
  const collect = (items: typeof errors, prefix = ""): string[] =>
    items.flatMap((error) => [
      ...Object.keys(error.constraints ?? {}).map(
        (constraint) => `${prefix}${error.property}:${constraint}`,
      ),
      ...collect(error.children ?? [], `${prefix}${error.property}.`),
    ]);
  return collect(errors);
}

describe("generated class-validator DTOs", () => {
  test("accept a valid registration", async () => {
    expect(await failures(valid)).toEqual([]);
  });

  test("optional fields may be left out", async () => {
    const { phone: _phone, avatar: _avatar, birthDate: _birthDate, ...required } = valid;
    expect(await failures(required)).toEqual([]);
  });

  test("reject each field-level rule", async () => {
    expect(await failures({ ...valid, email: "nope" })).toEqual(["email:isEmail"]);
    expect(await failures({ ...valid, firstName: "" })).toEqual(["firstName:minLength"]);
    expect(await failures({ ...valid, age: 12 })).toEqual(["age:min"]);
    expect(await failures({ ...valid, age: 20.5 })).toEqual(["age:isInt"]);
    expect(await failures({ ...valid, role: "owner" })).toEqual(["role:isEnum"]);
    expect(await failures({ ...valid, avatar: "not a url" })).toEqual(["avatar:isUrl"]);
    expect(await failures({ ...valid, birthDate: "10/12/1815" })).toEqual([
      "birthDate:isIso8601",
    ]);
    expect(await failures({ ...valid, tags: [] })).toEqual(["tags:arrayMinSize"]);
    expect(await failures({ ...valid, tags: ["x"] })).toEqual(["tags:minLength"]);
  });

  test("validate nested schemas", async () => {
    expect(await failures({ ...valid, address: { city: "London", postalCode: "E1" } })).toEqual([
      "address.postalCode:matches",
    ]);
  });

  test("enforce the passwordsMatch invariant with its message", async () => {
    const errors = await validate(
      plainToInstance(RegisterRequestDto, { ...valid, confirmPassword: "different-horse" }),
    );
    expect(errors.map((error) => [error.property, error.constraints])).toEqual([
      ["confirmPassword", { satisfies: "Passwords must match" }],
    ]);
  });
});
