"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  createMaterial,
  deleteMaterial as deleteMaterialRequest,
  getMaterials,
  updateMaterial,
} from "@/api/materials-api";
import type { Material, MaterialInput } from "@/types/material-t";

export const blankMaterial: MaterialInput = {
  description: "",
  name: "",
  price: 0,
  unit: "",
};

export function useMaterialManager(initialMaterials: Material[]) {
  const [materials, setMaterials] = useState(initialMaterials);
  const [form, setForm] = useState<MaterialInput>(blankMaterial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const isEditing = editingId !== null;
  const visibleMaterials = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return materials;
    }

    return materials.filter((material) => {
      return [material.name, material.unit, material.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [materials, query]);

  function setValue(field: keyof MaterialInput, value: string) {
    setForm((current) => ({
      ...current,
      [field]: field === "price" ? Number(value) : value,
    }));
  }

  function openNewMaterial() {
    setForm(blankMaterial);
    setEditingId(null);
    setMessage("");
    setIsDialogOpen(true);
  }

  function editMaterial(material: Material) {
    setForm({
      description: material.description ?? "",
      name: material.name,
      price: material.price,
      unit: material.unit,
    });
    setEditingId(material.id ?? null);
    setMessage("");
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setEditingId(null);
    setForm(blankMaterial);
  }

  async function loadMaterials() {
    setMaterials(await getMaterials());
  }

  async function saveMaterial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      if (isEditing) {
        await updateMaterial(editingId ?? "", form);
      } else {
        await createMaterial(form);
      }

      await loadMaterials();
      closeDialog();
      setMessage(isEditing ? "Material updated." : "Material saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save material");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteMaterial(material: Material) {
    if (!material.id) {
      setMessage("Material id is missing.");
      return;
    }

    if (!window.confirm(`Delete ${material.name}?`)) {
      return;
    }

    try {
      await deleteMaterialRequest(material.id);
      await loadMaterials();
      setMessage("Material deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete material");
    }
  }

  return {
    closeDialog,
    deleteMaterial,
    editMaterial,
    form,
    isDialogOpen,
    isEditing,
    isSaving,
    message,
    openNewMaterial,
    query,
    saveMaterial,
    setQuery,
    setValue,
    visibleMaterials,
  };
}
