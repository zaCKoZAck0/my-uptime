import { TGlobalResponse } from "./global-response";

export interface TResponseError {
    code: number;
    message: string;
    errors?: Record<string, unknown> 
}

class ApiHandler {
  private static instance: ApiHandler;
  private readonly baseUrl = "/api";

  private constructor() {}

  public static getInstance(): ApiHandler {
    if (!ApiHandler.instance) {
      ApiHandler.instance = new ApiHandler();
    }
    return ApiHandler.instance;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<[TGlobalResponse<T> | null, TResponseError | null]> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = (await response.json()) as TGlobalResponse<T>;

      if (!data.success) {
        return [null, {message: data.message, errors: data.errors, code: response.status}];
      }

      return [data, null];
    } catch (error) {
        console.log(error);
      return [
        null,
        {message: "Network Error", code: 0}
      ];
    }
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<[TGlobalResponse<T> | null, TResponseError | null]> {
    const queryString = params
      ? `?${new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: String(value),
            }),
            {}
          )
        ).toString()}`
      : "";

    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    });
  }

  public async post<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<[TGlobalResponse<T> | null, TResponseError | null]> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public async put<T>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<[TGlobalResponse<T> | null, TResponseError | null]> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  public async delete<T>(
    endpoint: string
  ): Promise<[TGlobalResponse<T> | null, TResponseError | null]> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

const api = ApiHandler.getInstance();
export default api;
