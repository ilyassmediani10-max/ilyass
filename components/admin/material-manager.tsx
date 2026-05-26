"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { MaterialFormDialog } from "@/components/admin/material-form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMaterialManager } from "@/hooks/use-material-manager";
import type { Material } from "@/types/material-t";
import { money } from "@/utils/order-view";

type IProps = {
  canEdit?: boolean;
  initialMaterials: Material[];
};

export function MaterialManager({ canEdit = true, initialMaterials }: IProps) {
  const manager = useMaterialManager(initialMaterials);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Materials</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Material List</h1>
        </div>
        {canEdit ? (
          <Button type="button" onClick={manager.openNewMaterial}>
            <Plus size={16} />
            Add Material
          </Button>
        ) : null}
      </div>

      {manager.message ? (
        <div className="mt-5 rounded-md border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          {manager.message}
        </div>
      ) : null}

      <Card className="mt-8 overflow-hidden">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle>Materials ({manager.visibleMaterials.length})</CardTitle>
          <Input
            value={manager.query}
            onChange={(event) => manager.setQuery(event.target.value)}
            placeholder="Search materials"
            className="sm:w-72"
          />
        </CardHeader>
        <MaterialTable
          canEdit={canEdit}
          materials={manager.visibleMaterials}
          onDelete={manager.deleteMaterial}
          onEdit={manager.editMaterial}
        />
      </Card>

      {manager.isDialogOpen ? (
        <MaterialFormDialog
          isEditing={manager.isEditing}
          isSaving={manager.isSaving}
          material={manager.form}
          onClose={manager.closeDialog}
          onSave={manager.saveMaterial}
          onValueChange={manager.setValue}
        />
      ) : null}
    </main>
  );
}

type TableProps = {
  canEdit: boolean;
  materials: Material[];
  onDelete: (material: Material) => void;
  onEdit: (material: Material) => void;
};

type RowProps = Omit<TableProps, "materials"> & {
  material: Material;
};

function MaterialTable({ canEdit, materials, onDelete, onEdit }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-right">Unit Cost</TableHead>
            <TableHead>Description</TableHead>
            {canEdit ? <TableHead className="text-right">Actions</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.length === 0 ? (
            <TableRow>
              <TableCell className="py-10 text-center text-muted-foreground" colSpan={canEdit ? 5 : 4}>
                No materials found.
              </TableCell>
            </TableRow>
          ) : null}
          {materials.map((material) => (
            <MaterialRow
              canEdit={canEdit}
              key={material.id ?? material.name}
              material={material}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MaterialRow({
  canEdit,
  material,
  onDelete,
  onEdit,
}: RowProps) {
  function handleEdit() {
    onEdit(material);
  }

  function handleDelete() {
    onDelete(material);
  }

  return (
    <TableRow>
      <TableCell className="font-medium text-foreground">{material.name}</TableCell>
      <TableCell className="text-muted-foreground">{material.unit}</TableCell>
      <TableCell className="text-right font-medium text-foreground">
        {money.format(material.price)}
      </TableCell>
      <TableCell className="text-muted-foreground">{material.description ?? "-"}</TableCell>
      {canEdit ? (
        <TableCell>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleEdit}>
              <Edit3 size={15} />
              Update
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              <Trash2 size={15} />
              Delete
            </Button>
          </div>
        </TableCell>
      ) : null}
    </TableRow>
  );
}
