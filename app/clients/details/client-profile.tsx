"use client";

import { useState } from "react";
import {
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  MapPin,
  UserRound,
} from "lucide-react";
import type { Client } from "../client-data";

type IProps = {
  clients: Client[];
};

export function ClientProfile({ clients }: IProps) {
  const [selectedNumber, setSelectedNumber] = useState(clients[0]?.number ?? "");
  const client = clients.find((item) => item.number === selectedNumber) ?? clients[0];

  if (!client) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
        <h1 className="mt-1 text-3xl font-bold">No clients found</h1>
        <p className="mt-3 text-slate-600">
          Add a client from the Client List page to see a profile here.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mt-1 text-3xl font-bold">{client.name}</h1>
        </div>

        <label className="grid min-w-72 gap-2 text-sm font-medium text-slate-700">
          Choose client
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <UserRound size={18} className="text-blue-600" />
            <select
              value={client.number}
              onChange={(event) => setSelectedNumber(event.target.value)}
              className="w-full bg-transparent text-slate-950 outline-none"
            >
              {clients.map((client) => (
                <option key={client.number} value={client.number}>
                  {client.name} - {client.number}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <MapPin className="text-blue-600" size={22} />
          <p className="mt-4 text-sm text-slate-500">Address</p>
          <p className="mt-1 font-medium">{client.address}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <ClipboardList className="text-blue-600" size={22} />
          <p className="mt-4 text-sm text-slate-500">Current order</p>
          <p className="mt-1 font-medium">{client.lastOrder}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <CircleDollarSign className="text-blue-600" size={22} />
          <p className="mt-4 text-sm text-slate-500">Total spent</p>
          <p className="mt-1 font-medium">{client.totalSpent || "$0"}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <CalendarDays className="text-blue-600" size={22} />
          <p className="mt-4 text-sm text-slate-500">Deadline</p>
          <p className="mt-1 font-medium">{client.deadline || "Not set"}</p>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold">Contact Details</h2>
        </div>
        <dl className="grid gap-0 sm:grid-cols-2">
          <div className="border-b border-slate-200 p-5 sm:border-r">
            <dt className="text-sm text-slate-500">Client number</dt>
            <dd className="mt-1 font-medium">{client.number}</dd>
          </div>
          <div className="border-b border-slate-200 p-5">
            <dt className="text-sm text-slate-500">Status</dt>
            <dd className="mt-1 font-medium">{client.status}</dd>
          </div>
          <div className="p-5 sm:border-r">
            <dt className="text-sm text-slate-500">Phone</dt>
            <dd className="mt-1 font-medium">{client.phone}</dd>
          </div>
          <div className="p-5">
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="mt-1 font-medium">{client.email}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
