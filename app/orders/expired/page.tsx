import { OrderManager } from "@/components/orders/order-manager";
import { getClients } from "@/services/client-service";
import { getOrders } from "@/services/order-service";

export const dynamic = "force-dynamic";

export default async function ExpiredOrdersPage() {
  const [clients, orders] = await Promise.all([getClients(), getOrders()]);

  return (
    <OrderManager
      clients={clients}
      initialOrders={orders}
      title="Expired Orders"
      filter="expired"
      canEdit={false}
    />
  );
}
