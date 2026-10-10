import { ContentType, defineVersionContract } from "codepot-openapi";
import { z } from "zod";

export const v1 = defineVersionContract({
  info: {
    title: "Generated API",
    version: "v1",
    description: "Generated Dryv API contracts",
    license: { name: "MIT", identifier: "MIT" },
  },
  defaults: { requestContentType: ContentType.json, responseContentType: ContentType.json },
});

export const sharedPropsRef = v1.defineProperties("GeneratedShared", {
  id: z.string().min(1),
  text: z.string(),
  message: z.string().min(1),
  number: z.coerce.number(),
  integer: z.coerce.number().int(),
  boolean: z.coerce.boolean(),
  dateTime: z.string().datetime(),
  date: z.string().date(),
  success: z.literal(true),
  failure: z.literal(false),
  jsonScalar: z.union([z.string(), z.number(), z.boolean(), z.null()]),
  jsonObject: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
}).ref;

const validationSchemasRef = v1.defineSchemas({
  ValidationIssue: {
    field: sharedPropsRef.text,
    message: sharedPropsRef.message,
    code: sharedPropsRef.text.optional(),
  },
}).ref;

export const transportSchemasRef = v1.defineSchemas({
  ApiMessage: {
    success: sharedPropsRef.success,
    message: sharedPropsRef.message,
  },
  ApiError: {
    success: sharedPropsRef.failure,
    message: sharedPropsRef.message,
    code: sharedPropsRef.text.optional(),
  },
  ValidationError: {
    success: sharedPropsRef.failure,
    message: sharedPropsRef.message,
    issues: validationSchemasRef.ValidationIssue.array(),
  },
}).ref;
