"use client";

import { Plus } from "lucide-react";
import type { Client } from "@/types/client-t";
import type { Order } from "@/types/order-t";
import { Button } from "@/components/ui/button";
import { OrderFormDialog } from "@/components/orders/order-form-dialog";
import { OrderManagerTable } from "@/components/orders/order-manager-table";
import { useOrderManager, type OrderFilter } from "@/hooks/use-order-manager";

type IProps = {
  canEdit?: boolean;
  clients: Client[];
  filter?: OrderFilter;
  initialOrders: Order[];
  title: string;
};

export function OrderManager({
  canEdit = true,
  clients,
  filter = "all",
  initialOrders,
  title,
}: IProps) {
  const manager = useOrderManager({ clients, filter, initialOrders });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Orders</p>
          <h1 className="mt-1 text-3xl font-bold">{title}</h1>
        </div>
        {canEdit ? (
          <Button type="button" onClick={manager.openNewOrder}>
            <Plus size={16} />
            Add Order
          </Button>
        ) : null}
      </div>

      {manager.message ? (
        <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {manager.message}
        </div>
      ) : null}

      <OrderManagerTable
        canEdit={canEdit}
        onDelete={manager.deleteOrder}
        onEdit={manager.editOrder}
        orders={manager.visibleOrders}
      />

      {manager.isDialogOpen ? (
        <OrderFormDialog
          clients={clients}
          isEditing={manager.isEditing}
          isSaving={manager.isSaving}
          onClientChange={manager.setClient}
          onClose={manager.closeDialog}
          onSave={manager.saveOrder}
          onValueChange={manager.setValue}
          order={manager.form}
        />
      ) : null}
    </main>
  );
}
