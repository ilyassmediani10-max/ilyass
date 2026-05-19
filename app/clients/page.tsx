import { ClientManager } from "./client-manager";
import { getClients } from "./client-service";

export default async function ClientListPage() {
  const clients = await getClients();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Clients</p>
          <h1 className="text-3xl font-bold">Client List</h1>
        </div>
      </div>

      <ClientManager initialClients={clients} />
    </main>
  );
}
