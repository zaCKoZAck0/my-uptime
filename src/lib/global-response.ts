import { APIError } from "./api-error";

export interface TGlobalResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: Record<string, unknown>;
  timestamp: string;
}

export function GlobalResponse<T>(
  data: T,
  message: string = "Success"
): TGlobalResponse<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export function GlobalErrorResponse(
  error: APIError | Error
): TGlobalResponse<null> {
  return {
    success: false,
    data: null,
    message: error.message,
    errors: (error as APIError).details,
    timestamp: new Date().toISOString(),
  };
}
