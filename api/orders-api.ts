import type { Order, OrderInput } from "@/types/order-t";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? body.error ?? "Order request failed");
  }

  return response.json() as Promise<T>;
}

export function getOrders(filter?: "expired" | "expiring-this-month") {
  const query = filter ? `?filter=${filter}` : "";

  return fetch(`/api/orders${query}`).then((response) => parseResponse<Order[]>(response));
}

export function createOrder(order: OrderInput) {
  return fetch("/api/orders", {
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ insertedId: string; message: string }>(response));
}

export function updateOrder(orderId: string, order: OrderInput) {
  return fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  }).then((response) => parseResponse<{ message: string }>(response));
}

export function deleteOrder(orderId: string) {
  return fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
    method: "DELETE",
  }).then((response) => parseResponse<{ message: string }>(response));
}
