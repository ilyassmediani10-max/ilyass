import { Edit3, Trash2 } from "lucide-react";
import type { Order } from "@/types/order-t";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { money, showDate } from "@/utils/order-view";

type IProps = {
  canEdit: boolean;
  onDelete: (order: Order) => void;
  onEdit: (order: Order) => void;
  orders: Order[];
};

type RowProps = Omit<IProps, "orders"> & {
  order: Order;
};

export function OrderManagerTable({ canEdit, onDelete, onEdit, orders }: IProps) {
  return (
    <Card className="mt-8 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Order</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              {canEdit ? <TableHead className="text-right">Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center text-slate-500" colSpan={canEdit ? 7 : 6}>
                  No orders found.
                </TableCell>
              </TableRow>
            ) : null}
            {orders.map((order) => (
              <OrderManagerRow
                canEdit={canEdit}
                key={order.id ?? order.number}
                onDelete={onDelete}
                onEdit={onEdit}
                order={order}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

function OrderManagerRow({ canEdit, onDelete, onEdit, order }: RowProps) {
  function handleEdit() {
    onEdit(order);
  }

  function handleDelete() {
    onDelete(order);
  }

  return (
    <TableRow>
      <TableCell className="font-medium text-slate-950">{order.number}</TableCell>
      <TableCell className="text-slate-700">{order.clientName}</TableCell>
      <TableCell className="text-slate-600">{order.service}</TableCell>
      <TableCell className="text-slate-600">{showDate(order.deadline)}</TableCell>
      <TableCell className="text-right font-medium text-slate-950">
        {money.format(order.price)}
      </TableCell>
      <TableCell className="text-slate-600">{order.status}</TableCell>
      {canEdit ? (
        <TableCell>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleEdit}
              aria-label={`Update ${order.number}`}
            >
              <Edit3 size={15} />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              aria-label={`Delete ${order.number}`}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </TableCell>
      ) : null}
    </TableRow>
  );
}
