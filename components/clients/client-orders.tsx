import { ClientOrderPicker } from "@/components/clients/client-order-picker";
import { getClients } from "@/services/client-service";
import { getOrders } from "@/services/order-service";

export async function ClientOrders() {
  const [clients, orders] = await Promise.all([getClients(), getOrders()]);

  return <ClientOrderPicker clients={clients} orders={orders} />;
}
