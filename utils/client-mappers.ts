import type { Client } from "@/types/client-t";

export type ClientRecord = Client & {
  _id?: unknown;
};

export function trimClient(client: Client): Client {
  return {
    number: client.number.trim(),
    name: client.name.trim(),
    phone: client.phone.trim(),
    email: client.email.trim(),
    address: client.address.trim(),
    status: client.status.trim(),
    totalSpent: client.totalSpent.trim(),
    lastOrder: client.lastOrder.trim(),
    deadline: client.deadline.trim(),
  };
}

export function toClient(document: ClientRecord): Client {
  return {
    id: document.id ?? String(document._id),
    number: document.number,
    name: document.name,
    phone: document.phone,
    email: document.email,
    address: document.address,
    status: document.status,
    totalSpent: document.totalSpent,
    lastOrder: document.lastOrder,
    deadline: document.deadline,
  };
}
