import type { Client } from "@/types/client-t";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? body.error ?? "Client request failed");
  }

  return response.json() as Promise<T>;
}

export function getClients(lastName?: string) {
  const query = lastName ? `?lastName=${encodeURIComponent(lastName)}` : "";

  return fetch(`/api/clients${query}`).then((response) => parseResponse<Client[]>(response));
}

export function createClient(client: Client) {
  return fetch("/api/clients", {
    body: JSON.stringify(client),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ insertedId: string; message: string }>(response));
}

export function updateClient(clientId: string, client: Client) {
  return fetch(`/api/clients/${encodeURIComponent(clientId)}`, {
    body: JSON.stringify(client),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  }).then((response) => parseResponse<{ message: string }>(response));
}

export function deleteClient(clientId: string) {
  return fetch(`/api/clients/${encodeURIComponent(clientId)}`, {
    method: "DELETE",
  }).then((response) => parseResponse<{ message: string }>(response));
}
