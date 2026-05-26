import type { Order } from "@/types/order-t";
import { getClientName } from "@/utils/client-mappers";

export type OrderRecord = Order & {
  _id?: unknown;
  clientId?: unknown;
};

export function trimOrder(order: Order): Order {
  return {
    number: order.number.trim(),
    clientId: order.clientId.trim(),
    clientName: order.clientName?.trim(),
    clientNumber: order.clientNumber?.trim(),
    service: order.service.trim(),
    orderDate: order.orderDate.trim(),
    deadline: order.deadline.trim(),
    price: Number(order.price) || 0,
    status: order.status.trim(),
    materials: order.materials ?? [],
  };
}

export function toOrder(order: OrderRecord): Order {
  const client = order.clientId as {
    _id?: unknown;
    clientNumber?: number;
    firstName?: string;
    lastName?: string;
  };
  const hasPopulatedClient = typeof order.clientId === "object" && order.clientId !== null;

  return {
    id: order.id ?? String(order._id),
    number: order.number,
    clientId: hasPopulatedClient ? String(client._id) : String(order.clientId ?? ""),
    clientName: hasPopulatedClient
      ? getClientName({
          apartment: 0,
          city: "",
          clientNumber: client.clientNumber ?? 0,
          firstName: client.firstName ?? "",
          houseNumber: "",
          lastName: client.lastName ?? "",
          street: "",
        })
      : order.clientName,
    clientNumber: hasPopulatedClient
      ? String(client.clientNumber ?? "")
      : order.clientNumber,
    service: order.service,
    orderDate: order.orderDate,
    deadline: order.deadline,
    price: order.price,
    status: order.status,
    materials: order.materials ?? [],
  };
}
