"use client";

import { MapPin, Search, UserRound } from "lucide-react";
import type { Client } from "@/types/client-t";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClientLastNameSearch } from "@/hooks/use-client-last-name-search";
import { getClientAddress, getClientName } from "@/utils/client-mappers";

type IProps = {
  clients: Client[];
};

export function ClientProfile({ clients }: IProps) {
  const { matches, query, setQuery } = useClientLastNameSearch(clients);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Clients</p>
          <h1 className="mt-1 text-3xl font-bold">Client Details</h1>
        </div>
        <div className="relative sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find by part of last name"
            className="pl-9"
          />
        </div>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {matches.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent>
              <p className="text-sm text-slate-500">No clients found.</p>
            </CardContent>
          </Card>
        ) : null}

        {matches.map((client) => (
          <Card key={client.id ?? client.clientNumber}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserRound size={18} />
                {getClientName(client)}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <Detail label="Client number" value={String(client.clientNumber)} />
              <Detail label="First name" value={client.firstName} />
              <Detail label="Last name" value={client.lastName} />
              <div className="flex gap-2 text-slate-600">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />
                <span>{getClientAddress(client)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-slate-500">{label}: </span>
      <span className="font-medium text-slate-950">{value}</span>
    </p>
  );
}
