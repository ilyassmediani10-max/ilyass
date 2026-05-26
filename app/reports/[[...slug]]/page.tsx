import { DataManagementPage } from "@/components/admin/data-management-page";
import { ClientManager } from "@/components/clients/client-manager";
import { OrderTable } from "@/components/orders/order-table";
import { Card, CardContent } from "@/components/ui/card";
import { getTotalMaterialCosts } from "@/services/material-service";
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
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
        <PageTitle title="Client Report" />
        <ClientManager canEdit={false} initialClients={await getClients()} />
      </main>
    );
  }

  if (slug[0] === "orders") {
    const summary = await getOrderQuerySummary();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
        <PageTitle title="Order Report" />
        <OrderTable orders={summary.orders} />
      </main>
    );
  }

  if (slug[0] === "material-requirements") {
    const requirements = await getMaterialRequirements();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
        <PageTitle title="Material Requirements Report" />
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {requirements.map((item) => (
            <Card key={item.materialId}>
              <CardContent>
                <p className="font-medium text-slate-950">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500">
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

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
        <PageTitle title="Cost Summary" />
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <SummaryCard label="Order Prices" value={money.format(orderTotal)} />
          <SummaryCard label="Material Costs" value={money.format(totalMaterialCosts)} />
        </section>
      </main>
    );
  }

  return <DataManagementPage path={path} section="Reports" />;
}

function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-blue-600">Reports</p>
      <h1 className="mt-1 text-3xl font-bold">{title}</h1>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      </CardContent>
    </Card>
  );
}
