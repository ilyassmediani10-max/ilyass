import { DataManagementPage } from "@/components/admin/data-management-page";
import { PageHeading } from "@/components/admin/page-heading";
import { SummaryCard } from "@/components/admin/summary-card";
import { ClientManager } from "@/components/clients/client-manager";
import { OrderTable } from "@/components/orders/order-table";
import { Card, CardContent } from "@/components/ui/card";
import { getPlannedMaterialCosts, getTotalMaterialCosts } from "@/services/material-service";
import { getClients } from "@/services/client-service";
import { getMaterialRequirements, getOrderQuerySummary } from "@/services/order-service";
import { money } from "@/utils/order-view";

type IProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function ReportsPage({ params }: IProps) {
  const { slug = [] } = await params;
  const path = ["reports", ...slug].join("/");

  if (slug[0] === "clients") {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Reports" title="Client Report" />
        <ClientManager canEdit={false} initialClients={await getClients()} />
      </main>
    );
  }

  if (slug[0] === "orders") {
    const summary = await getOrderQuerySummary();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Reports" title="Order Report" />
        <OrderTable orders={summary.orders} />
      </main>
    );
  }

  if (slug[0] === "material-requirements") {
    const requirements = await getMaterialRequirements();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Reports" title="Material Requirements Report" />
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {requirements.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-sm text-muted-foreground">No material requirements found.</p>
              </CardContent>
            </Card>
          ) : null}
          {requirements.map((item) => (
            <Card key={item.materialId}>
              <CardContent>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.quantity} {item.unit} planned
                </p>
                <p className="mt-3 text-lg font-semibold">{money.format(item.totalCost)}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    );
  }

  if (slug[0] === "cost-summary") {
    const [summary, totalMaterialCosts] = await Promise.all([
      getOrderQuerySummary(),
      getTotalMaterialCosts(),
    ]);
    const orderTotal = summary.orders.reduce((sum, order) => sum + order.price, 0);
    const plannedMaterialTotal = await getPlannedMaterialCosts();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageHeading section="Reports" title="Cost Summary" />
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <SummaryCard label="Order Prices" value={money.format(orderTotal)} />
          <SummaryCard label="Planned Material Costs" value={money.format(plannedMaterialTotal)} />
          <SummaryCard label="Used Material Costs" value={money.format(totalMaterialCosts)} />
        </section>
      </main>
    );
  }

  return <DataManagementPage path={path} section="Reports" />;
}
