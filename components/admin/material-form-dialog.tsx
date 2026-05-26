import { X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MaterialInput } from "@/types/material-t";

type IProps = {
  isEditing: boolean;
  isSaving: boolean;
  material: MaterialInput;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onValueChange: (field: keyof MaterialInput, value: string) => void;
};

export function MaterialFormDialog({
  isEditing,
  isSaving,
  material,
  onClose,
  onSave,
  onValueChange,
}: IProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">
            {isEditing ? "Update Material" : "Add Material"}
          </h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </Button>
        </DialogHeader>
        <form onSubmit={onSave} className="grid max-h-[75vh] gap-4 overflow-y-auto p-5 md:grid-cols-2">
          <MaterialField label="Name" value={material.name} onChange={(value) => onValueChange("name", value)} required />
          <MaterialField label="Unit" value={material.unit} onChange={(value) => onValueChange("unit", value)} required />
          <MaterialField label="Price" type="number" min="0" value={String(material.price)} onChange={(value) => onValueChange("price", value)} required />
          <MaterialField label="Description" value={material.description ?? ""} onChange={(value) => onValueChange("description", value)} />
          <div className="flex justify-end gap-3 border-t pt-4 md:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : isEditing ? "Update Material" : "Add Material"}
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

function MaterialField({ label, min, onChange, required, type, value }: FieldProps) {
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
