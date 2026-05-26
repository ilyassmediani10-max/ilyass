"use client";

import { Plus } from "lucide-react";
import type { Client } from "@/types/client-t";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useClientFilter } from "@/hooks/use-client-filter";
import { useClientForm } from "@/hooks/use-client-form";
import { getClientAddress, getClientName } from "@/utils/client-mappers";

type IProps = {
  initialClients: Client[];
  canEdit?: boolean;
};

export function ClientManager({ initialClients, canEdit = true }: IProps) {
  const manager = useClientForm(initialClients);
  const { filteredClients, query, setQuery, stats } = useClientFilter(manager.clients);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {manager.message ? (
          <p className="text-sm text-slate-600">{manager.message}</p>
        ) : (
          <span />
        )}
        {canEdit ? (
          <Button type="button" onClick={manager.openNewClient}>
            <Plus size={16} />
            Add Client
          </Button>
        ) : null}
      </div>

      <Card className="mt-6 overflow-hidden">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle>Client List ({stats.total})</CardTitle>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients"
            className="sm:w-72"
          />
        </CardHeader>
        <ClientTable clients={filteredClients} />
      </Card>

      {manager.isDialogOpen ? (
        <ClientFormDialog
          cities={manager.cities}
          client={manager.form}
          isSaving={manager.isSaving}
          onClose={manager.closeDialog}
          onSave={manager.saveClient}
          onValueChange={manager.setValue}
          streetOptions={manager.streetOptions}
        />
      ) : null}
    </>
  );
}

function ClientTable({ clients }: { clients: Client[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Client</TableHead>
            <TableHead>Client number</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell className="py-10 text-center text-slate-500" colSpan={3}>
                No clients found.
              </TableCell>
            </TableRow>
          ) : null}
          {clients.map((client) => (
            <TableRow key={client.id ?? client.clientNumber}>
              <TableCell className="font-medium text-slate-950">{getClientName(client)}</TableCell>
              <TableCell>{client.clientNumber}</TableCell>
              <TableCell className="text-slate-600">{getClientAddress(client)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
