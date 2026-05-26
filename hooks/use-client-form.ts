"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createClient, getClients } from "@/api/clients-api";
import type { Client } from "@/types/client-t";
import { cities, streetsByCity } from "@/constants/address-data";

const firstCity = cities[0] ?? "";

export const blankClient: Client = {
  apartment: 0,
  city: firstCity,
  clientNumber: 0,
  firstName: "",
  houseNumber: "",
  lastName: "",
  street: streetsByCity[firstCity]?.[0] ?? "",
};

export function useClientForm(initialClients: Client[]) {
  const [clients, setClients] = useState(initialClients);
  const [form, setForm] = useState<Client>(blankClient);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const streetOptions = useMemo(() => streetsByCity[form.city] ?? [], [form.city]);

  function setValue(field: keyof Client, value: string) {
    setForm((current) => {
      if (field === "city") {
        return {
          ...current,
          city: value,
          street: streetsByCity[value]?.[0] ?? "",
        };
      }

      return {
        ...current,
        [field]: field === "apartment" || field === "clientNumber" ? Number(value) : value,
      };
    });
  }

  async function loadClients() {
    setClients(await getClients());
  }

  async function saveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      await createClient(form);
      await loadClients();
      setForm(blankClient);
      setIsDialogOpen(false);
      setMessage("Client saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save client");
    } finally {
      setIsSaving(false);
    }
  }

  function openNewClient() {
    setForm(blankClient);
    setMessage("");
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setForm(blankClient);
  }

  return {
    cities,
    closeDialog,
    clients,
    form,
    isDialogOpen,
    isSaving,
    message,
    openNewClient,
    saveClient,
    setValue,
    streetOptions,
  };
}
