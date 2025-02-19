export class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "APIError";
    Object.setPrototypeOf(this, APIError.prototype);
  }

  static badRequest(message: string) {
    return new APIError(message, 400);
  }

  static unauthorized(message: string = "Unauthorized") {
    return new APIError(message, 401);
  }

  static forbidden(message: string = "Forbidden") {
    return new APIError(message, 403);
  }

  static notFound(message: string = "Resource not found") {
    return new APIError(message, 404);
  }

  static conflict(message: string) {
    return new APIError(message, 409);
  }

  static tooMany(message: string = "Too many requests") {
    return new APIError(message, 429);
  }

  withDetails(details: Record<string, unknown>) {
    this.details = details;
    return this;
  }

  withCode(code: string) {
    this.code = code;
    return this;
  }
}
