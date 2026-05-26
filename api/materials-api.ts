import type { Material, MaterialInput, MaterialUsage, MaterialUsageInput } from "@/types/material-t";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message ?? body.error ?? "Material request failed");
  }

  return response.json() as Promise<T>;
}

export function getMaterials() {
  return fetch("/api/materials").then((response) => parseResponse<Material[]>(response));
}

export function createMaterial(material: MaterialInput) {
  return fetch("/api/materials", {
    body: JSON.stringify(material),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ insertedId: string; message: string }>(response));
}

export function updateMaterial(materialId: string, material: MaterialInput) {
  return fetch(`/api/materials/${encodeURIComponent(materialId)}`, {
    body: JSON.stringify(material),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  }).then((response) => parseResponse<{ message: string }>(response));
}

export function deleteMaterial(materialId: string) {
  return fetch(`/api/materials/${encodeURIComponent(materialId)}`, {
    method: "DELETE",
  }).then((response) => parseResponse<{ message: string }>(response));
}

export function createMaterialUsage(usage: MaterialUsageInput) {
  return fetch("/api/material-usage", {
    body: JSON.stringify(usage),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).then((response) => parseResponse<{ insertedId: string; message: string }>(response));
}

export function getMaterialsByOrder(orderId: string) {
  return fetch(`/api/material-usage/by-order/${encodeURIComponent(orderId)}`)
    .then((response) => parseResponse<MaterialUsage[]>(response));
}
