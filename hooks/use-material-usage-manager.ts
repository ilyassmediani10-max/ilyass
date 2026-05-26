"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createMaterialUsage, getMaterialUsage } from "@/api/materials-api";
import type { MaterialUsage } from "@/types/material-t";

type IParams = {
  initialUsage: MaterialUsage[];
};

export function useMaterialUsageManager({ initialUsage }: IParams) {
  const [usage, setUsage] = useState(initialUsage);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const totalPlanned = useMemo(() => {
    return usage.reduce((sum, row) => sum + row.plannedQuantity * row.priceSnapshot, 0);
  }, [usage]);

  async function saveUsage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await createMaterialUsage({
        materialId: String(formData.get("materialId") ?? ""),
        orderId: String(formData.get("orderId") ?? ""),
        plannedQuantity: Number(formData.get("plannedQuantity") ?? 0),
        priceSnapshot: Number(formData.get("priceSnapshot") ?? 0),
        usedQuantity: Number(formData.get("usedQuantity") ?? 0),
      });

      setUsage(await getMaterialUsage());
      form.reset();
      setMessage("Material usage saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save material usage.");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    isSaving,
    message,
    saveUsage,
    totalPlanned,
    usage,
  };
}
