import { OrderDataForm } from "@/components/orders/order-data-form";
import { getClients } from "@/services/client-service";
import { getCurrentRole } from "@/utils/server-auth";

export const dynamic = "force-dynamic";

export default async function NewOrderPage() {
  const [clients, role] = await Promise.all([getClients(), getCurrentRole()]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Orders</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">New Order</h1>
      </div>

      {role === "ADMIN" ? (
        <OrderDataForm clients={clients} />
      ) : (
        <section className="mt-8 rounded-md border bg-card p-5 text-sm text-muted-foreground shadow-xs">
          Only admins can create orders.
        </section>
      )}
    </main>
  );
}
