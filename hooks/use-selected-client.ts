"use client";

import { useMemo, useState } from "react";
import type { Client } from "@/types/client-t";
import type { Order } from "@/types/order-t";

export function useSelectedClient(clients: Client[], orders: Order[] = []) {
  const [clientNumber, setClientNumber] = useState(String(clients[0]?.clientNumber ?? ""));

  const selectedClient = useMemo(() => {
    return (
      clients.find((client) => String(client.clientNumber) === String(clientNumber)) ??
      clients[0]
    );
  }, [clientNumber, clients]);

  const selectedOrders = useMemo(() => {
    return orders.filter((order) => {
      return order.clientId
        ? String(order.clientId) === String(selectedClient?.id)
        : String(order.clientNumber) === String(selectedClient?.clientNumber);
    });
  }, [orders, selectedClient?.clientNumber, selectedClient?.id]);

  return {
    clientNumber: String(selectedClient?.clientNumber ?? clientNumber),
    selectedClient,
    selectedOrders,
    setClientNumber,
  };
}
