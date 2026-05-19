"use client";

import { useMemo, useState } from "react";
import {
  Edit3,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import type { Client } from "./client-data";

const emptyClient: Client = {
  number: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  status: "Active",
  totalSpent: "",
  lastOrder: "",
  deadline: "",
};

type ClientManagerProps = {
  initialClients: Client[];
};

export function ClientManager({ initialClients }: ClientManagerProps) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [form, setForm] = useState<Client>(emptyClient);
  const [editingNumber, setEditingNumber] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sortedClients = useMemo(
    () => [...clients].sort((first, second) => first.number.localeCompare(second.number)),
    [clients],
  );

  const isEditing = editingNumber !== null;

  function updateField(field: keyof Client, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(emptyClient);
    setEditingNumber(null);
    setMessage("");
  }

  function startEditing(client: Client) {
    setForm(client);
    setEditingNumber(client.number);
    setMessage("");
  }

  async function loadClients() {
    const response = await fetch("/api/clients");

    if (!response.ok) {
      throw new Error("Could not load clients");
    }

    setClients(await response.json());
  }

  async function saveClient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const endpoint = isEditing
      ? `/api/clients/${encodeURIComponent(editingNumber)}`
      : "/api/clients";

    const response = await fetch(endpoint, {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsSaving(false);

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setMessage(result?.error ?? "Could not save client");
      return;
    }

    await loadClients();
    setMessage(isEditing ? "Client updated." : "Client added.");
    setForm(emptyClient);
    setEditingNumber(null);
  }

  async function deleteClient(client: Client) {
    const shouldDelete = window.confirm(`Delete ${client.name}?`);

    if (!shouldDelete) {
      return;
    }

    const response = await fetch(`/api/clients/${encodeURIComponent(client.number)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setMessage(result?.error ?? "Could not delete client");
      return;
    }

    await loadClients();
    setMessage("Client deleted.");
  }

  return (
    <>
      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold">{isEditing ? "Update Client" : "Add Client"}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Changes are saved directly in MongoDB Atlas.
            </p>
          </div>
          {isEditing ? (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Cancel editing"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>

        <form onSubmit={saveClient} className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Client number
            <input
              value={form.number}
              onChange={(event) => updateField("number", event.target.value)}
              required
              disabled={isEditing}
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500 disabled:bg-slate-100"
              placeholder="CL-1005"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Name
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="Client name"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Phone
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="+1 555 000 0000"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="client@example.com"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Address
            <input
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              required
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="Street, city"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Status
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Paused</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Total spent
            <input
              value={form.totalSpent}
              onChange={(event) => updateField("totalSpent", event.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="$0"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            Last order
            <input
              value={form.lastOrder}
              onChange={(event) => updateField("lastOrder", event.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="Kitchen renovation"
            />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700 md:col-span-2">
            Deadline
            <input
              value={form.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 font-normal text-slate-950 outline-none focus:border-blue-500"
              placeholder="June 20, 2026"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isEditing ? <Edit3 size={16} /> : <Plus size={16} />}
              {isSaving ? "Saving..." : isEditing ? "Update Client" : "Add Client"}
            </button>
            {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          </div>
        </form>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {sortedClients.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 md:col-span-2">
            No clients in MongoDB yet.
          </div>
        ) : null}

        {sortedClients.map((client) => (
          <article
            key={client.number}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <UserRound size={22} />
                </div>
                <div>
                  <h2 className="font-semibold">{client.name}</h2>
                  <p className="text-sm text-slate-500">{client.number}</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {client.status}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Phone size={16} />
                {client.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                {client.email}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {client.address}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => startEditing(client)}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Edit3 size={15} />
                Update
              </button>
              <button
                type="button"
                onClick={() => deleteClient(client)}
                className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
