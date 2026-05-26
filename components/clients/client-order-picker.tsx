"use client";

import { Search } from "lucide-react";
import type { Client } from "@/types/client-t";
import type { Order } from "@/types/order-t";
import { OrderTable } from "@/components/orders/order-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClientLastNameSearch } from "@/hooks/use-client-last-name-search";
import { getClientName } from "@/utils/client-mappers";

type IProps = {
  clients: Client[];
  orders: Order[];
};

export function ClientOrderPicker({ clients, orders }: IProps) {
  const { matches, query, setQuery } = useClientLastNameSearch(clients);
  const matchedIds = new Set(matches.map((client) => String(client.id)));
  const matchedNumbers = new Set(matches.map((client) => String(client.clientNumber)));
  const visibleOrders = orders.filter((order) => {
    return order.clientId
      ? matchedIds.has(String(order.clientId))
      : matchedNumbers.has(String(order.clientNumber));
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Clients</p>
          <h1 className="mt-1 text-3xl font-bold">Client Orders</h1>
        </div>
        <div className="relative sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find client by last name"
            className="pl-9"
          />
        </div>
      </div>

      <section className="mt-6 grid gap-3 md:grid-cols-2">
        {matches.map((client) => (
          <Card key={client.id ?? client.clientNumber}>
            <CardContent>
              <p className="font-medium text-slate-950">{getClientName(client)}</p>
              <p className="mt-1 text-sm text-slate-500">Client #{client.clientNumber}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <OrderTable orders={visibleOrders} />
    </main>
  );
}
