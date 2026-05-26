"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createOrder, deleteOrder as deleteOrderRequest, getOrders, updateOrder } from "@/api/orders-api";
import { OrderStatus } from "@/constants/order-status";
import type { Client } from "@/types/client-t";
import type { Order } from "@/types/order-t";
import { getClientName } from "@/utils/client-mappers";
import { isExpiredOrder, isOrderExpiringThisMonth } from "@/utils/order-view";

export type OrderFilter = "all" | "expired" | "month";

export const blankOrder: Order = {
  number: "",
  clientId: "",
  clientName: "",
  clientNumber: "",
  service: "",
  orderDate: "",
  deadline: "",
  price: 0,
  status: OrderStatus.planning,
  materials: [],
};

type IParams = {
  clients: Client[];
  filter: OrderFilter;
  initialOrders: Order[];
};

export function useOrderManager({ clients, filter, initialOrders }: IParams) {
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState<Order>(blankOrder);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = editingId !== null;
  const visibleOrders = useMemo(() => {
    if (filter === "expired") {
      return orders.filter(isExpiredOrder);
    }

    if (filter === "month") {
      return orders.filter(isOrderExpiringThisMonth);
    }

    return orders;
  }, [filter, orders]);

  function setValue(field: keyof Order, value: string) {
    setForm((current) => ({
      ...current,
      [field]: field === "price" ? Number(value) : value,
    }));
  }

  function setClient(value: string) {
    const client = clients.find((item) => String(item.id) === value);

    setForm((current) => ({
      ...current,
      clientId: String(client?.id ?? ""),
      clientNumber: String(client?.clientNumber ?? ""),
      clientName: client ? getClientName(client) : "",
    }));
  }

  function openNewOrder() {
    const firstClient = clients[0];

    setForm({
      ...blankOrder,
      clientId: String(firstClient?.id ?? ""),
      clientNumber: String(firstClient?.clientNumber ?? ""),
      clientName: firstClient ? getClientName(firstClient) : "",
    });
    setEditingId(null);
    setMessage("");
    setIsDialogOpen(true);
  }

  function editOrder(order: Order) {
    setForm(order);
    setEditingId(order.id ?? null);
    setMessage("");
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingId(null);
    setForm(blankOrder);
  }

  async function loadOrders() {
    setOrders(await getOrders());
  }

  async function saveOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const payload = {
        clientId: form.clientId,
        deadline: form.deadline,
        number: form.number,
        orderDate: form.orderDate,
        price: form.price,
        service: form.service,
        status: form.status,
      };

      if (isEditing) {
        await updateOrder(editingId ?? "", payload);
      } else {
        await createOrder(payload);
      }

      await loadOrders();
      closeDialog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save order");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteOrder(order: Order) {
    if (!order.id) {
      setMessage("Order id is missing.");
      return;
    }

    if (!window.confirm(`Delete ${order.number}?`)) {
      return;
    }

    try {
      await deleteOrderRequest(order.id);
      await loadOrders();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete order");
      return;
    }
  }

  return {
    closeDialog,
    deleteOrder,
    editOrder,
    form,
    isDialogOpen,
    isEditing,
    isSaving,
    message,
    openNewOrder,
    saveOrder,
    setClient,
    setValue,
    visibleOrders,
  };
}
