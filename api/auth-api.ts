import type { SignInInput, SignUpInput } from "@/validators/auth-validator";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? body.error ?? "Authentication failed.");
  }

  return response.json() as Promise<T>;
}

export function signIn(input: SignInInput) {
  return fetch("/api/auth/signin", {
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ role: string }>(response));
}

export function signUp(input: SignUpInput) {
  return fetch("/api/auth/signup", {
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ role: string }>(response));
}

export function signOut() {
  return fetch("/api/auth/signout", { method: "POST" });
}
