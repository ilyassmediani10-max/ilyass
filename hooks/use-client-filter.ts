"use client";

import { useMemo, useState } from "react";
import type { Client } from "@/types/client-t";
import { getClientAddress, getClientName } from "@/utils/client-mappers";

export function useClientFilter(clients: Client[]) {
  const [query, setQuery] = useState("");

  const filteredClients = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return clients;
    }

    return clients.filter((client) => {
      return [client.lastName, getClientName(client), client.clientNumber, getClientAddress(client)]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [clients, query]);

  return {
    filteredClients,
    query,
    setQuery,
    stats: { total: clients.length },
  };
}
