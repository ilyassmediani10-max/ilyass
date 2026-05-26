import { DataManagementPage } from "@/components/admin/data-management-page";
import { PageHeading } from "@/components/admin/page-heading";
import { MaterialUsageManager } from "@/components/admin/material-usage-manager";
import { MaterialManager } from "@/components/admin/material-manager";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMaterials, getMaterialUsage } from "@/services/material-service";
import { getMaterialRequirements, getOrders } from "@/services/order-service";
import { getCurrentRole } from "@/utils/server-auth";
import { money } from "@/utils/order-view";

type IProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function MaterialsPage({ params }: IProps) {
  const { slug = [] } = await params;

  if (slug.length === 0 || slug[0] === "list") {
    const [materials, role] = await Promise.all([getMaterials(), getCurrentRole()]);

    return <MaterialManager canEdit={role === "ADMIN"} initialMaterials={materials} />;
  }

  if (slug[0] === "requirements") {
    const requirements = await getMaterialRequirements();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Materials" title="Material Requirements" />
        <RequirementsTable requirements={requirements} />
      </main>
    );
  }

  if (slug[0] === "usage") {
    const [materials, orders, role, usage] = await Promise.all([
      getMaterials(),
      getOrders(),
      getCurrentRole(),
      getMaterialUsage(),
    ]);

    return (
      <MaterialUsageManager
        canEdit={role === "ADMIN"}
        initialUsage={usage}
        materials={materials}
        orders={orders}
      />
    );
  }

  if (slug[0] === "by-order") {
    const usage = await getMaterialUsage();
    const usageByOrder = new Map<string, typeof usage>();

    usage.forEach((item) => {
      const orderKey = item.orderNumber ?? item.orderId;
      const rows = usageByOrder.get(orderKey) ?? [];

      rows.push(item);
      usageByOrder.set(orderKey, rows);
    });

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Materials" title="Materials By Order" />
        <section className="mt-8 grid gap-4">
          {[...usageByOrder.entries()].map(([orderNumber, rows]) => (
            <Card key={orderNumber} className="overflow-hidden">
              <div className="border-b p-4">
                <h2 className="font-semibold text-foreground">{orderNumber}</h2>
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Material</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="text-right">Planned</TableHead>
                      <TableHead className="text-right">Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id ?? `${row.orderId}-${row.materialId}`}>
                        <TableCell className="font-medium">{row.materialName ?? row.materialId}</TableCell>
                        <TableCell className="text-muted-foreground">{row.materialUnit ?? "-"}</TableCell>
                        <TableCell className="text-right">{row.plannedQuantity}</TableCell>
                        <TableCell className="text-right">{row.usedQuantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ))}
          {usage.length === 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">
              No material usage saved yet.
            </Card>
          ) : null}
        </section>
      </main>
    );
  }

  const path = ["materials", ...slug].join("/");
  return <DataManagementPage path={path} section="Materials" />;
}

function RequirementsTable({
  requirements,
}: {
  requirements: Awaited<ReturnType<typeof getMaterialRequirements>>;
}) {
  return (
    <Card className="mt-8 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Material</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Planned Quantity</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center text-muted-foreground" colSpan={4}>
                  No material requirements found.
                </TableCell>
              </TableRow>
            ) : null}
            {requirements.map((item) => (
              <TableRow key={item.materialId}>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {money.format(item.totalCost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
