import { X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { Client } from "@/types/client-t";

type IProps = {
  cities: string[];
  client: Client;
  isSaving: boolean;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onValueChange: (field: keyof Client, value: string) => void;
  streetOptions: string[];
};

export function ClientFormDialog({
  cities,
  client,
  isSaving,
  onClose,
  onSave,
  onValueChange,
  streetOptions,
}: IProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">Add Client</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </Button>
        </DialogHeader>
        <form onSubmit={onSave} className="grid max-h-[75vh] gap-4 overflow-y-auto p-5 md:grid-cols-2">
          <ClientField label="First name" value={client.firstName} onChange={(value) => onValueChange("firstName", value)} required />
          <ClientField label="Last name" value={client.lastName} onChange={(value) => onValueChange("lastName", value)} required />
          <ClientField label="Client number" type="number" min="1" value={String(client.clientNumber || "")} onChange={(value) => onValueChange("clientNumber", value)} required />
          <Label>
            City
            <Select value={client.city} onChange={(event) => onValueChange("city", event.target.value)}>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </Select>
          </Label>
          <Label>
            Street
            <Select value={client.street} onChange={(event) => onValueChange("street", event.target.value)}>
              {streetOptions.map((street) => (
                <option key={street}>{street}</option>
              ))}
            </Select>
          </Label>
          <ClientField label="House number" value={client.houseNumber} onChange={(value) => onValueChange("houseNumber", value)} required />
          <ClientField label="Apartment" type="number" min="0" value={String(client.apartment || "")} onChange={(value) => onValueChange("apartment", value)} required />
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 md:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Add Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type FieldProps = {
  label: string;
  min?: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
};

function ClientField({ label, min, onChange, required, type, value }: FieldProps) {
  return (
    <Label>
      {label}
      <Input
        min={min}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </Label>
  );
}
