import { OrderManager } from "@/components/orders/order-manager";
import { getClients } from "@/services/client-service";
import { getOrders } from "@/services/order-service";

export const dynamic = "force-dynamic";

export default async function OrderDeadlinesPage() {
  const [clients, orders] = await Promise.all([getClients(), getOrders()]);

  return (
    <OrderManager
      clients={clients}
      initialOrders={orders}
      title="Order Deadlines"
      canEdit={false}
    />
  );
}
