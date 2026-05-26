import { X } from "lucide-react";
import type { FormEvent } from "react";
import type { Client } from "@/types/client-t";
import type { Order } from "@/types/order-t";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { orderStatuses } from "@/hooks/use-order-manager";
import { getClientName } from "@/utils/client-mappers";

type IProps = {
  clients: Client[];
  isEditing: boolean;
  isSaving: boolean;
  onClientChange: (value: string) => void;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onValueChange: (field: keyof Order, value: string) => void;
  order: Order;
};

export function OrderFormDialog({
  clients,
  isEditing,
  isSaving,
  onClientChange,
  onClose,
  onSave,
  onValueChange,
  order,
}: IProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">{isEditing ? "Update Order" : "Add Order"}</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </Button>
        </DialogHeader>
        <form onSubmit={onSave} className="grid max-h-[75vh] gap-4 overflow-y-auto p-5 md:grid-cols-2">
          <OrderField
            label="Order number"
            value={order.number}
            onChange={(value) => onValueChange("number", value)}
            placeholder="ORD-MA-1006"
            required
          />
          <Label>
            Client
            <Select value={order.clientId} onChange={(event) => onClientChange(event.target.value)} required>
              <option value="">Choose client</option>
              {clients.map((client) => (
                <option key={client.id ?? client.clientNumber} value={client.id ?? ""}>
                  {getClientName(client)}
                </option>
              ))}
            </Select>
          </Label>
          <OrderField
            label="Service"
            value={order.service}
            onChange={(value) => onValueChange("service", value)}
            placeholder="Kitchen paint"
            required
          />
          <OrderField
            label="Price"
            min="0"
            type="number"
            value={String(order.price)}
            onChange={(value) => onValueChange("price", value)}
            required
          />
          <OrderField
            label="Order date"
            type="date"
            value={order.orderDate}
            onChange={(value) => onValueChange("orderDate", value)}
            required
          />
          <OrderField
            label="Deadline"
            type="date"
            value={order.deadline}
            onChange={(value) => onValueChange("deadline", value)}
            required
          />
          <Label className="md:col-span-2">
            Status
            <Select value={order.status} onChange={(event) => onValueChange("status", event.target.value)}>
              {orderStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>
          </Label>
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 md:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Update Order" : "Add Order"}
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
  placeholder?: string;
  required?: boolean;
  type?: string;
  value: string;
};

function OrderField({ label, min, onChange, placeholder, required, type, value }: FieldProps) {
  return (
    <Label>
      {label}
      <Input
        min={min}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </Label>
  );
}
