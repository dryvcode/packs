import "reflect-metadata";
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { Global, type INestApplication, Module, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";

import {
  CoreUserManagementController as ClassValidatorController,
  CoreUserManagementService as ClassValidatorService,
} from "./out/server/index.ts";
import {
  CoreUserManagementModule as ZodModule,
  CoreUserManagementService as ZodService,
} from "./out/server-zod/index.ts";
import { AppModule } from "./out/app/app.module.ts";
import { DatabaseModule } from "./out/app/database/database.module.ts";

// Stands in for the project's DatabaseModule: repositories resolve without a database.
@Global()
@Module({
  providers: [
    {
      provide: getDataSourceToken(),
      useValue: { options: { type: "postgres" }, entityMetadatas: [], getRepository: () => ({}) },
    },
  ],
  exports: [getDataSourceToken()],
})
class InMemoryDatabaseModule {}

const created = {
  id: "7f1c1f52-2f58-4a4e-9b43-0c1a3c1b0a11",
  externalCustomerId: "0f7a0e6e-54b8-4d1e-8a52-6f3fdbd6e7d2",
  displayName: "Ada",
  status: "active",
  createdAt: "2026-09-25T08:00:00Z",
};

type SearchUsersInput = {
  status: string;
  limit: number;
  traceId: string;
  session: string;
};

function searchResult(input: SearchUsersInput) {
  if (input.status !== "active") throw new Error(`status = ${input.status}, want active`);
  if (input.limit !== 25) throw new Error(`limit = ${String(input.limit)}, want 25`);
  if (input.traceId !== created.id) throw new Error(`traceId = ${input.traceId}, want ${created.id}`);
  if (input.session !== "session-1") {
    throw new Error(`session = ${input.session}, want session-1`);
  }
  return { ...created, displayName: "Search" } as never;
}

class InMemoryClassValidatorUsers extends ClassValidatorService {
  async createUser(request: object) {
    return { ...created, ...request } as never;
  }
  async getUser() {
    return created as never;
  }
  async listUsers() {
    return { items: [created], total: 1 };
  }
  async searchUsers(input: SearchUsersInput) {
    return searchResult(input);
  }
}

class InMemoryZodUsers extends ZodService {
  async createUser(request: object) {
    return { ...created, ...request } as never;
  }
  async getUser() {
    return created as never;
  }
  async listUsers() {
    return { items: [created], total: 1 };
  }
  async searchUsers(input: SearchUsersInput) {
    return searchResult(input);
  }
}

async function start(app: INestApplication): Promise<string> {
  await app.listen(0);
  return app.getUrl();
}

async function post(base: string, body: unknown): Promise<number> {
  const response = await fetch(`${base}/api/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.status;
}

const validRequest = {
  externalCustomerId: "0f7a0e6e-54b8-4d1e-8a52-6f3fdbd6e7d2",
  displayName: "Ada",
};

describe("generated NestJS server over class-validator", () => {
  let app: INestApplication;
  let base: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClassValidatorController],
      providers: [{ provide: ClassValidatorService, useClass: InMemoryClassValidatorUsers }],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    base = (await start(app)).replace("[::1]", "localhost");
  });
  afterAll(() => app.close());

  test("accepts a valid body and rejects an invalid one", async () => {
    expect(await post(base, validRequest)).toBe(201);
    expect(await post(base, { ...validRequest, externalCustomerId: "nope" })).toBe(400);
    expect(await post(base, { ...validRequest, id: created.id })).toBe(400);
  });

  test("routes path parameters", async () => {
    const response = await fetch(`${base}/api/users/${created.id}`);
    expect(response.status).toBe(200);
    expect((await response.json()).displayName).toBe("Ada");
  });

  test("binds query, header and cookie inputs", async () => {
    const response = await fetch(`${base}/api/users/search?status=active&limit=25`, {
      headers: {
        "X-Trace-Id": created.id,
        Cookie: "session=session-1",
      },
    });
    expect(response.status).toBe(200);
    expect((await response.json()).displayName).toBe("Search");
  });
});

describe("generated NestJS server over zod", () => {
  let app: INestApplication;
  let base: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ZodModule],
    })
      .overrideProvider(ZodService)
      .useClass(InMemoryZodUsers)
      .compile();
    app = moduleRef.createNestApplication();
    base = (await start(app)).replace("[::1]", "localhost");
  });
  afterAll(() => app.close());

  test("validates bodies with the zod schema through the generated pipe", async () => {
    expect(await post(base, validRequest)).toBe(201);
    expect(await post(base, { ...validRequest, displayName: "" })).toBe(400);
  });
});

describe("generated application assembly", () => {
  let app: INestApplication;
  let base: string;

  beforeAll(async () => {
    // AppModule -> group module -> feature module, which binds the contract to the
    // project implementation; the test swaps in an in-memory implementation.
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideModule(DatabaseModule)
      .useModule(InMemoryDatabaseModule)
      .overrideProvider(ClassValidatorService)
      .useClass(InMemoryClassValidatorUsers)
      .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    base = (await start(app)).replace("[::1]", "localhost");
  });
  afterAll(() => app.close());

  test("serves feature routes through AppModule", async () => {
    const response = await fetch(`${base}/api/users/${created.id}`);
    expect(response.status).toBe(200);
    expect((await response.json()).displayName).toBe("Ada");
  });
});
