import mongoose from "mongoose";
import { materials as sampleMaterials } from "@/constants/material-data";
import { MaterialUsageModel } from "@/models/material-usage-model";
import { MaterialModel } from "@/models/material-model";
import { OrderModel } from "@/models/order-model";
import { connectMongoose } from "@/utils/mongoose-client";
import type { Material, MaterialInput, MaterialUsage, MaterialUsageInput } from "@/types/material-t";

function ensureObjectId(id: string, label: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${label} id`);
  }
}

function toMaterial(document: Material & { _id?: unknown; materialId?: string; unitCost?: number }): Material {
  return {
    description: document.description ?? "",
    id: document.id ?? String(document._id ?? document.materialId),
    name: document.name,
    price: Number(document.price ?? document.unitCost) || 0,
    unit: document.unit,
  };
}

function toMaterialUsage(document: MaterialUsage & {
  _id?: unknown;
  materialId?: unknown;
  orderId?: unknown;
}): MaterialUsage {
  const material = document.materialId as {
    _id?: unknown;
    name?: string;
    price?: number;
    unit?: string;
  };
  const order = document.orderId as {
    _id?: unknown;
    number?: string;
  };

  return {
    id: String(document._id),
    materialId: String(material?._id ?? document.materialId),
    materialName: material?.name,
    materialUnit: material?.unit,
    orderId: String(order?._id ?? document.orderId),
    orderNumber: order?.number,
    plannedQuantity: Number(document.plannedQuantity) || 0,
    priceSnapshot: Number(document.priceSnapshot ?? material?.price) || 0,
    usedQuantity: Number(document.usedQuantity) || 0,
  };
}

export async function getMaterials(): Promise<Material[]> {
  try {
    await connectMongoose();
    const documents = await MaterialModel.find({}).sort({ name: 1 }).lean();

    if (documents.length === 0) {
      return sampleMaterials;
    }

    return documents.map((document) => toMaterial(document as Material & { _id?: unknown }));
  } catch (error) {
    console.error("Could not load materials from MongoDB", error);

    return sampleMaterials;
  }
}

export async function createMaterial(material: MaterialInput) {
  await connectMongoose();
  const existing = await MaterialModel.findOne({ name: material.name }).lean();

  if (existing) {
    throw new Error("A material with this name already exists.");
  }

  const result = await MaterialModel.create(material);

  return String(result._id);
}

export async function updateMaterial(materialId: string, material: MaterialInput) {
  ensureObjectId(materialId, "material");
  await connectMongoose();

  const existing = await MaterialModel.findOne({
    _id: { $ne: materialId },
    name: material.name,
  }).lean();

  if (existing) {
    throw new Error("A material with this name already exists.");
  }

  const result = await MaterialModel.updateOne({ _id: materialId }, { $set: material });

  if (result.matchedCount === 0) {
    throw new Error("Material not found.");
  }
}

export async function deleteMaterial(materialId: string) {
  ensureObjectId(materialId, "material");
  await connectMongoose();

  const usage = await MaterialUsageModel.findOne({ materialId }).lean();

  if (usage) {
    throw new Error("Material is used by an order and cannot be deleted.");
  }

  const result = await MaterialModel.deleteOne({ _id: materialId });

  if (result.deletedCount === 0) {
    throw new Error("Material not found.");
  }
}

export async function createMaterials(materials: Material[]) {
  await connectMongoose();
  return MaterialModel.insertMany(materials.map(toMaterial));
}

export async function getMaterialUsage(): Promise<MaterialUsage[]> {
  try {
    await connectMongoose();
    const documents = await MaterialUsageModel.find({})
      .populate("materialId")
      .populate("orderId")
      .lean();

    return documents.map((document) => toMaterialUsage(document as MaterialUsage & { _id?: unknown }));
  } catch (error) {
    console.error("Could not load material usage from MongoDB", error);

    return [];
  }
}

export async function getMaterialUsageByOrder(orderId: string): Promise<MaterialUsage[]> {
  ensureObjectId(orderId, "order");
  await connectMongoose();
  const documents = await MaterialUsageModel.find({ orderId })
    .populate("materialId")
    .populate("orderId")
    .lean();

  return documents.map((document) => toMaterialUsage(document as MaterialUsage & { _id?: unknown }));
}

export async function createMaterialUsage(input: MaterialUsageInput) {
  ensureObjectId(input.orderId, "order");
  ensureObjectId(input.materialId, "material");
  await connectMongoose();

  const [order, material] = await Promise.all([
    OrderModel.findById(input.orderId).lean(),
    MaterialModel.findById(input.materialId).lean(),
  ]);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (!material) {
    throw new Error("Material not found.");
  }

  const result = await MaterialUsageModel.create({
    ...input,
    priceSnapshot: input.priceSnapshot ?? Number(material.price),
  });

  return String(result._id);
}

export async function getTotalMaterialCosts() {
  const usage = await getMaterialUsage();

  return usage.reduce((total, row) => {
    return total + row.priceSnapshot * row.usedQuantity;
  }, 0);
}

export async function getPlannedMaterialCosts() {
  const usage = await getMaterialUsage();

  return usage.reduce((total, row) => {
    return total + row.priceSnapshot * row.plannedQuantity;
  }, 0);
}
