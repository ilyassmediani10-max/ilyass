import { DataManagementPage } from "@/components/admin/data-management-page";
import { PageHeading } from "@/components/admin/page-heading";
import { SummaryCard } from "@/components/admin/summary-card";
import { OrderTable } from "@/components/orders/order-table";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getMaterialUsage,
  getPlannedMaterialCosts,
  getTotalMaterialCosts,
} from "@/services/material-service";
import { getOrders } from "@/services/order-service";
import { money } from "@/utils/order-view";

type IProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CostsPage({ params }: IProps) {
  const { slug = [] } = await params;
  const path = ["costs", ...slug].join("/");

  if (slug[0] === "order-prices") {
    const orders = await getOrders();
    const total = orders.reduce((sum, order) => sum + order.price, 0);

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Costs" title="Order Prices" />
        <SummaryCard className="mt-8" label="Total Order Prices" value={money.format(total)} />
        <OrderTable orders={orders} />
      </main>
    );
  }

  if (slug[0] === "material-costs") {
    const [usage, total] = await Promise.all([
      getMaterialUsage(),
      getPlannedMaterialCosts(),
    ]);

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Costs" title="Planned Material Costs" />
        <SummaryCard className="mt-8" label="Total Planned Cost" value={money.format(total)} />
        <Card className="mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Material</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Planned Quantity</TableHead>
                  <TableHead className="text-right">Planned Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usage.length === 0 ? (
                  <TableRow>
                    <TableCell className="py-10 text-center text-muted-foreground" colSpan={4}>
                      No planned material costs found. Add rows in Materials / Material Usage.
                    </TableCell>
                  </TableRow>
                ) : null}
                {usage.map((item) => (
                  <TableRow key={item.id ?? `${item.orderId}-${item.materialId}`}>
                    <TableCell className="font-medium">{item.materialName ?? item.materialId}</TableCell>
                    <TableCell className="text-muted-foreground">{item.materialUnit ?? "-"}</TableCell>
                    <TableCell className="text-right">{item.plannedQuantity}</TableCell>
                    <TableCell className="text-right font-medium">
                      {money.format(item.plannedQuantity * item.priceSnapshot)}
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

  if (slug[0] === "total-material-costs") {
    const [usage, total] = await Promise.all([getMaterialUsage(), getTotalMaterialCosts()]);

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Costs" title="Used Material Costs" />
        <SummaryCard className="mt-8" label="Total Used Cost" value={money.format(total)} />
        <Card className="mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[760px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Order</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Used Quantity</TableHead>
                  <TableHead className="text-right">Unit Cost</TableHead>
                  <TableHead className="text-right">Used Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usage.length === 0 ? (
                  <TableRow>
                    <TableCell className="py-10 text-center text-muted-foreground" colSpan={5}>
                      No used material costs found. Add rows in Materials / Material Usage.
                    </TableCell>
                  </TableRow>
                ) : null}
                {usage.map((item) => (
                  <TableRow key={item.id ?? `${item.orderId}-${item.materialId}`}>
                    <TableCell className="font-medium">{item.orderNumber ?? item.orderId}</TableCell>
                    <TableCell>{item.materialName ?? item.materialId}</TableCell>
                    <TableCell className="text-right">{item.usedQuantity}</TableCell>
                    <TableCell className="text-right">{money.format(item.priceSnapshot)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {money.format(item.usedQuantity * item.priceSnapshot)}
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

  return <DataManagementPage path={path} section="Costs" />;
}
