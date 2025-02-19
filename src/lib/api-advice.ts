import { z } from "zod";
import { APIError } from "./api-error";
import { NextResponse } from "next/server";
import { GlobalErrorResponse } from "./global-response";

export function validateRequest<T>(
  body: ReadableStream<Uint8Array<ArrayBufferLike>> | null,
  schema: z.Schema<T>
): z.SafeParseSuccess<T>["data"] {
  const validation = schema.safeParse(body);
  if (!validation.success) {
    throw APIError.badRequest("Validation Failed")
      .withCode("VALIDATION_FAILED")
      .withDetails(validation.error.flatten());
  }
  return validation.data;
}

export function ErrorResponse(error: unknown) {
  console.error(error);
  if (error instanceof APIError) {
    return NextResponse.json(GlobalErrorResponse(error), {
      status: error.statusCode,
    });
  }
  return NextResponse.json(GlobalErrorResponse(error as Error), {
    status: 500,
  });
}
