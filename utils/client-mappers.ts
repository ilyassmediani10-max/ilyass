import type { Client } from "@/types/client-t";

export type ClientRecord = Client & {
  address?: string;
  _id?: unknown;
  name?: string;
  number?: string;
};

export function trimClient(client: Client): Client {
  return {
    apartment: Number(client.apartment) || 0,
    city: client.city.trim(),
    clientNumber: Number(client.clientNumber),
    firstName: client.firstName.trim(),
    houseNumber: client.houseNumber.trim(),
    lastName: client.lastName.trim(),
    street: client.street.trim(),
  };
}

export function toClient(document: ClientRecord): Client {
  const [firstName = "", lastName = ""] = (document.firstName
    ? [document.firstName, document.lastName]
    : (document.name ?? "").split(" ")).filter(Boolean);
  const [street = "", houseNumber = ""] = (document.street
    ? [document.street, document.houseNumber]
    : (document.address ?? "").split(",")[0]?.trim().split(/\s+(?=\S+$)/) ?? []);
  const legacyNumber = Number(String(document.number ?? "").replace(/\D/g, ""));

  return {
    apartment: Number(document.apartment) || 0,
    city: document.city ?? "",
    clientNumber: document.clientNumber ?? legacyNumber,
    firstName,
    houseNumber,
    id: document.id ?? String(document._id),
    lastName,
    street,
  };
}

export function getClientName(client: Client) {
  return `${client.firstName} ${client.lastName}`;
}

export function getClientAddress(client: Client) {
  return `${client.city}, ${client.street} ${client.houseNumber}, apt. ${client.apartment}`;
}
