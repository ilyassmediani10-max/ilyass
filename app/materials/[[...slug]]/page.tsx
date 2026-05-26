import { DataManagementPage } from "@/components/admin/data-management-page";
import { MaterialManager } from "@/components/admin/material-manager";
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
import { getMaterials } from "@/services/material-service";
import { getMaterialRequirements, getOrders } from "@/services/order-service";
import { getCurrentRole } from "@/utils/server-auth";
import { money } from "@/utils/order-view";

type IProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function MaterialsPage({ params }: IProps) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    const [materials, role] = await Promise.all([getMaterials(), getCurrentRole()]);

    return <MaterialManager canEdit={role === "ADMIN"} initialMaterials={materials} />;
  }

  if (slug[0] === "requirements") {
    const requirements = await getMaterialRequirements();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageTitle section="Materials" title="Material Requirements" />
        <RequirementsTable requirements={requirements} />
      </main>
    );
  }

  if (slug[0] === "by-order" || slug[0] === "usage") {
    const orders = await getOrders();

    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
        <PageTitle
          section="Materials"
          title={slug[0] === "by-order" ? "Materials By Order" : "Material Usage"}
        />
        <OrderTable orders={orders} />
      </main>
    );
  }

  const path = ["materials", ...slug].join("/");
  return <DataManagementPage path={path} section="Materials" />;
}

function PageTitle({ section, title }: { section: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{section}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  );
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
