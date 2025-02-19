import { TResponseError } from "~/lib/api-client";

export function ToastError(action: string, error: TResponseError | null) {
  const title = action;
  const description = error?.message || "An unexpected error occurred";

  console.error(error?.errors);

  return {
    title,
    description: (
      <div className="flex flex-col gap-1">
        <div className="text-xs mt-1">
          <span>{description}</span> {", "}
          {error?.code && <span>Code: ({error.code})</span>}
        </div>
      </div>
    ),
    variant: "destructive" as const,
  };
}
