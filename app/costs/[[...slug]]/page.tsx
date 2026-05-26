import { DataManagementPage } from "@/components/admin/data-management-page";
import { OrderTable } from "@/components/orders/order-table";
import { Card, CardContent } from "@/components/ui/card";
import { getTotalMaterialCosts } from "@/services/material-service";
import { getMaterialRequirements, getOrders } from "@/services/order-service";
import { money } from "@/utils/order-view";

type IProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CostsPage({ params }: IProps) {
  const { slug = [] } = await params;
  const path = ["costs", ...slug].join("/");

  if (slug[0] === "order-prices") {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageTitle title="Order Prices" />
        <OrderTable orders={await getOrders()} />
      </main>
    );
  }

  if (slug[0] === "material-costs") {
    const total = (await getMaterialRequirements()).reduce(
      (sum, item) => sum + item.totalCost,
      0,
    );

    return <CostCard label="Planned Material Costs" value={money.format(total)} />;
  }

  if (slug[0] === "total-material-costs") {
    const total = await getTotalMaterialCosts();

    return <CostCard label="Total Material Costs" value={money.format(total)} />;
  }

  return <DataManagementPage path={path} section="Costs" />;
}

function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">Costs</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  );
}

function CostCard({ label, value }: { label: string; value: string }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <PageTitle title={label} />
      <Card className="mt-8">
        <CardContent>
          <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>
        </CardContent>
      </Card>
    </main>
  );
}
