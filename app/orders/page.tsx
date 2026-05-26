import { OrderManager } from "@/components/orders/order-manager";
import { getClients } from "@/services/client-service";
import { getOrders } from "@/services/order-service";
import { getCurrentRole } from "@/utils/server-auth";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const role = await getCurrentRole();
  const [clients, orders] = await Promise.all([getClients(), getOrders()]);

  return (
    <OrderManager
      canEdit={role === "ADMIN"}
      clients={clients}
      initialOrders={orders}
      title="Order List"
    />
  );
}
