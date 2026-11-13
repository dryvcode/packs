# TypeScript / JavaScript ecosystem

Status: candidate backlog only. Existing coverage is marked complete.

This is currently Dryv's strongest ecosystem. Expansion here should not crowd out cross-language work.

## Existing coverage

### Backend

- [x] `inject/backend/nestjs`

### Persistence

- [x] `inject/persistence/typeorm`
- [x] `inject/persistence/mongoose`

### Validation

- [x] `inject/validation/class-validator`
- [x] `inject/validation/zod`
- [x] `inject/validation/joi`

### Clients

- [x] `unit/clients/ts-api-client`
- [x] `unit/clients/next-api-bridge`

### Frontend

- [x] `inject/frontend/react-crud-forms`
- [x] `unit/frontend/nextjs-app`
- [x] `unit/frontend/react-native-app`

## Backend candidates

- [ ] Express
- [ ] Fastify
- [ ] Hono
- [ ] Koa
- [ ] Elysia
- [ ] AdonisJS research
- [ ] Nitro/h3 research
- [ ] tRPC research only if its semantic model composes cleanly with Dryv operations
- [ ] generated routing separated from business logic
- [ ] validation/persistence composition through capability slots

Models:

- `nestjs`
- `fastapi-backend`

## Persistence candidates

- [ ] Prisma
- [ ] Drizzle ORM
- [ ] MikroORM
- [ ] Sequelize
- [ ] Kysely research
- [ ] Knex research
- [ ] Prisma MongoDB applicability audit
- [ ] database schema/migration ownership audit for tools that have their own schema authority

Primary model: `typeorm`.

Important: do not create a second semantic schema model inside a pack merely to feed another generator.

## Validation candidates

- [ ] Valibot
- [ ] Yup
- [ ] ArkType
- [ ] TypeBox
- [ ] Ajv / JSON Schema
- [ ] Superstruct
- [ ] io-ts research
- [ ] effect Schema research
- [ ] standard-schema compatibility research

Models:

- `zod`
- `joi`
- `class-validator`

## Client candidates

- [ ] Axios client SDK
- [ ] Ky client SDK
- [ ] Node-native fetch client variant
- [ ] React Query/TanStack Query operation hooks
- [ ] SWR hooks
- [ ] Apollo/GraphQL client only after GraphQL contract design is justified
- [ ] WebSocket client research when Runtime IR supports the needed semantics

Primary model: `ts-api-client`.

## Frontend/component candidates

- [ ] Vue CRUD forms
- [ ] Svelte CRUD forms
- [ ] Angular reactive forms
- [ ] SolidJS forms
- [ ] React Hook Form variant
- [ ] TanStack Form variant
- [ ] Formik research
- [ ] Vue composables for operations
- [ ] Svelte stores/actions for operations
- [ ] Angular services for operations
- [ ] table/list components
- [ ] detail components
- [ ] search/filter components where IR semantics are sufficient
- [ ] mutation feedback/error components

Primary model: `react-crud-forms`.

## Project candidates

- [ ] React + Vite
- [ ] Vue
- [ ] Nuxt
- [ ] SvelteKit
- [ ] Angular
- [ ] SolidStart
- [ ] Remix / React Router framework research
- [ ] Astro application research
- [ ] Express API project
- [ ] Fastify API project
- [ ] Hono project
- [ ] NestJS complete project research

Models:

- `nextjs-app`
- `react-native-app`

## Other JavaScript ecosystem candidates

- [ ] GraphQL schema/resolver packs
- [ ] Apollo Server research
- [ ] Yoga GraphQL research
- [ ] Socket.IO research
- [ ] BullMQ job/worker research
- [ ] KafkaJS research
- [ ] OpenTelemetry integration
- [ ] Vitest/Jest API contract test generation research

## Context questions to verify

- [ ] headers/cookies
- [ ] files/multipart
- [ ] streaming/SSE
- [ ] WebSocket semantics
- [ ] auth/security
- [ ] pagination/filter semantic coverage

New TypeScript packs should be added when they prove a distinct reusable pattern, not merely to increase pack count.
