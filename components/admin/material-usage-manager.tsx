"use client";

import { PageHeading } from "@/components/admin/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Material, MaterialUsage } from "@/types/material-t";
import type { Order } from "@/types/order-t";
import { useMaterialUsageManager } from "@/hooks/use-material-usage-manager";
import { money } from "@/utils/order-view";

type IProps = {
  canEdit?: boolean;
  initialUsage: MaterialUsage[];
  materials: Material[];
  orders: Order[];
};

export function MaterialUsageManager({
  canEdit = true,
  initialUsage,
  materials,
  orders,
}: IProps) {
  const manager = useMaterialUsageManager({ initialUsage });
  const firstMaterial = materials[0];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <PageHeading section="Materials" title="Material Usage" />

      {canEdit ? (
        <form onSubmit={manager.saveUsage} className="mt-8 grid gap-4 rounded-md border bg-card p-5 shadow-xs md:grid-cols-2">
          <Label>
            Order
            <Select name="orderId" required defaultValue="">
              <option value="">Choose order</option>
              {orders.map((order) => (
                <option key={order.id ?? order.number} value={order.id ?? ""}>
                  {order.number} - {order.service}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Material
            <Select name="materialId" required defaultValue="">
              <option value="">Choose material</option>
              {materials.map((material) => (
                <option key={material.id ?? material.name} value={material.id ?? ""}>
                  {material.name}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Planned quantity
            <Input min="0" name="plannedQuantity" type="number" required />
          </Label>
          <Label>
            Used quantity
            <Input min="0" name="usedQuantity" type="number" required />
          </Label>
          <Label className="md:col-span-2">
            Price snapshot
            <Input
              min="0"
              name="priceSnapshot"
              type="number"
              defaultValue={firstMaterial?.price ?? 0}
              required
            />
          </Label>
          <div className="flex flex-col gap-3 border-t pt-4 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="min-h-5 text-sm text-muted-foreground">{manager.message}</p>
            <Button type="submit" disabled={manager.isSaving}>
              {manager.isSaving ? "Saving..." : "Save Usage"}
            </Button>
          </div>
        </form>
      ) : null}

      <Card className="mt-8 overflow-hidden">
        <CardHeader>
          <CardTitle>Usage ({manager.usage.length}) - Planned {money.format(manager.totalPlanned)}</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Order</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Planned</TableHead>
                <TableHead className="text-right">Used</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manager.usage.length === 0 ? (
                <TableRow>
                  <TableCell className="py-10 text-center text-muted-foreground" colSpan={5}>
                    No material usage saved yet.
                  </TableCell>
                </TableRow>
              ) : null}
              {manager.usage.map((row) => (
                <TableRow key={row.id ?? `${row.orderId}-${row.materialId}`}>
                  <TableCell className="font-medium">{row.orderNumber ?? row.orderId}</TableCell>
                  <TableCell>{row.materialName ?? row.materialId}</TableCell>
                  <TableCell className="text-right">{row.plannedQuantity}</TableCell>
                  <TableCell className="text-right">{row.usedQuantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    {money.format(row.plannedQuantity * row.priceSnapshot)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
  );
}
