"use client";

import { useState } from "react";
import { createOrder } from "@/api/orders-api";
import { OrderStatus, orderStatuses } from "@/constants/order-status";
import type { Client } from "@/types/client-t";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getClientName } from "@/utils/client-mappers";

type IProps = {
  clients: Client[];
};

export function OrderDataForm({ clients }: IProps) {
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function submit(formData: FormData) {
    setIsSaving(true);
    setMessage("");

    try {
      await createOrder({
        clientId: String(formData.get("clientId") ?? ""),
        deadline: String(formData.get("deadline") ?? ""),
        number: String(formData.get("number") ?? ""),
        orderDate: String(formData.get("orderDate") ?? ""),
        price: Number(formData.get("price") ?? 0),
        service: String(formData.get("service") ?? ""),
        status: String(formData.get("status") ?? "") as OrderStatus,
      });

      setMessage("Order created successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create order.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form action={submit} className="mt-8 grid gap-4 rounded-md border bg-card p-5 shadow-xs md:grid-cols-2">
      <Label>
        Order number
        <Input name="number" placeholder="ORD-MA-1006" required />
      </Label>
      <Label>
        Client
        <Select name="clientId" required defaultValue="">
          <option value="">Choose client</option>
          {clients.map((client) => (
            <option key={client.id ?? client.clientNumber} value={client.id ?? ""}>
              {getClientName(client)}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Service
        <Input name="service" placeholder="Kitchen paint" required />
      </Label>
      <Label>
        Price
        <Input min="0" name="price" type="number" required />
      </Label>
      <Label>
        Order date
        <Input name="orderDate" type="date" required />
      </Label>
      <Label>
        Deadline
        <Input name="deadline" type="date" required />
      </Label>
      <Label className="md:col-span-2">
        Status
        <Select name="status" required defaultValue={orderStatuses[0]}>
          {orderStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </Label>
      <div className="flex flex-col gap-3 border-t pt-4 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-5 text-sm text-muted-foreground">{message}</p>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}
