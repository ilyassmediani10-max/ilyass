import type { Order } from "@/types/order-t";
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
  orders: Order[];
};

export function OrderTable({ orders }: IProps) {
  return (
    <Card className="mt-8 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Order</TableHead>
              <TableHead>Order date</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Materials</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center text-muted-foreground" colSpan={4}>
                  No orders found.
                </TableCell>
              </TableRow>
            ) : null}

            {orders.map((order) => (
              <TableRow key={order.id ?? order.number}>
                <TableCell className="font-medium text-foreground">{order.number}</TableCell>
                <TableCell className="text-muted-foreground">{showDate(order.orderDate)}</TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {money.format(order.price)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <ul className="grid gap-1">
                    {order.materials.map((material) => (
                      <li key={material.materialId}>
                        {material.name}: {material.quantity} x {money.format(material.unitCost)}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
