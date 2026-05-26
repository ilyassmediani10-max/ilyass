import { ClientManager } from "@/components/clients/client-manager";
import { getClients } from "@/services/client-service";
import { getCurrentRole } from "@/utils/server-auth";

export default async function ClientListPage() {
  const role = await getCurrentRole();
  const clients = await getClients();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Clients</p>
          <h1 className="text-3xl font-bold tracking-tight">Client List</h1>
        </div>
      </div>

      <ClientManager initialClients={clients} canEdit={role === "ADMIN"} />
    </main>
  );
}
