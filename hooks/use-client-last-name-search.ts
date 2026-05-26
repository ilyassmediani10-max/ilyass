"use client";

import { useMemo, useState } from "react";
import type { Client } from "@/types/client-t";

export function useClientLastNameSearch(clients: Client[]) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return clients;
    }

    return clients.filter((client) => client.lastName.toLowerCase().includes(search));
  }, [clients, query]);

  return {
    matches,
    query,
    setQuery,
  };
}
