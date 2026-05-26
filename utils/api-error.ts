import { z } from "zod";

export async function getResponseError(response: Response, fallback = "Something went wrong.") {
  const data = await response.json().catch(() => null);

  return data?.message ?? data?.error ?? fallback;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join(" ");
  }

  return error instanceof Error ? error.message : fallback;
}
