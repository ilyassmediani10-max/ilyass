import mongoose from "mongoose";
import { orders as sampleOrders } from "@/constants/order-data";
import { OrderStatus } from "@/constants/order-status";
import { ClientModel } from "@/models/client-model";
import { MaterialUsageModel } from "@/models/material-usage-model";
import { OrderModel } from "@/models/order-model";
import { toOrder, type OrderRecord } from "@/utils/order-mappers";
import { connectMongoose } from "@/utils/mongoose-client";
import type { MaterialRequirement } from "@/types/order-t";
import type { Order, OrderInput, OrderQuerySummary } from "@/types/order-t";

function dateOnly(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function ensureObjectId(id: string, label: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${label} id`);
  }
}

function monthRange(today = new Date()) {
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return {
    end: end.toISOString().slice(0, 10),
    start: start.toISOString().slice(0, 10),
  };
}

function todayIso(today = new Date()) {
  return dateOnly(today).toISOString().slice(0, 10);
}

async function getOrderDocuments(query = {}) {
  await connectMongoose();
  await ClientModel.findOne().lean();

  return OrderModel.find(query)
    .sort({ deadline: 1, number: 1 })
    .populate("clientId")
    .lean();
}

export async function getOrders(): Promise<Order[]> {
  try {
    const documents = await getOrderDocuments();

    return documents.map((document) => toOrder(document as OrderRecord));
  } catch (error) {
    console.error("Could not load orders from MongoDB", error);

    return sampleOrders;
  }
}

export async function getExpiredOrders(): Promise<Order[]> {
  const documents = await getOrderDocuments({
    deadline: { $lt: todayIso() },
    status: { $ne: OrderStatus.completed },
  });

  return documents.map((document) => toOrder(document as OrderRecord));
}

export async function getOrdersExpiringThisMonth(): Promise<Order[]> {
  const { end, start } = monthRange();
  const documents = await getOrderDocuments({
    deadline: { $gte: start, $lt: end },
    status: { $ne: OrderStatus.completed },
  });

  return documents.map((document) => toOrder(document as OrderRecord));
}

export async function createOrder(order: OrderInput) {
  ensureObjectId(order.clientId, "client");
  await connectMongoose();

  const client = await ClientModel.findById(order.clientId).lean();

  if (!client) {
    throw new Error("Client not found.");
  }

  const existing = await OrderModel.findOne({ number: order.number }).lean();

  if (existing) {
    throw new Error("An order with this number already exists.");
  }

  const result = await OrderModel.create(order);

  return String(result._id);
}

export async function updateOrder(orderId: string, order: OrderInput) {
  ensureObjectId(orderId, "order");
  ensureObjectId(order.clientId, "client");
  await connectMongoose();

  const client = await ClientModel.findById(order.clientId).lean();

  if (!client) {
    throw new Error("Client not found.");
  }

  const existing = await OrderModel.findOne({
    _id: { $ne: orderId },
    number: order.number,
  }).lean();

  if (existing) {
    throw new Error("An order with this number already exists.");
  }

  const result = await OrderModel.updateOne({ _id: orderId }, { $set: order });

  if (result.matchedCount === 0) {
    throw new Error("Order not found.");
  }
}

export async function deleteOrder(orderId: string) {
  ensureObjectId(orderId, "order");
  await connectMongoose();

  const result = await OrderModel.deleteOne({ _id: orderId });

  if (result.deletedCount === 0) {
    throw new Error("Order not found.");
  }

  await MaterialUsageModel.deleteMany({ orderId });
}

export async function getMaterialRequirements(): Promise<MaterialRequirement[]> {
  let rows: Array<{
    materialId: unknown;
    plannedQuantity: unknown;
    priceSnapshot?: unknown;
  }> = [];

  try {
    await connectMongoose();
    rows = await MaterialUsageModel.find({})
      .populate("materialId")
      .lean();
  } catch (error) {
    console.error("Could not load material requirements from MongoDB", error);

    return [];
  }

  const requirements = new Map<string, MaterialRequirement>();

  rows.forEach((row) => {
    const material = row.materialId as unknown as {
      _id: unknown;
      name: string;
      price: number;
      unit: string;
    };
    const materialId = String(material._id);
    const current = requirements.get(materialId) ?? {
      materialId,
      name: material.name,
      quantity: 0,
      totalCost: 0,
      unit: material.unit,
    };
    const plannedQuantity = Number(row.plannedQuantity) || 0;
    const price = Number(row.priceSnapshot ?? material.price) || 0;

    current.quantity += plannedQuantity;
    current.totalCost += plannedQuantity * price;
    requirements.set(materialId, current);
  });

  return [...requirements.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getOrderQuerySummary(): Promise<OrderQuerySummary> {
  const [orders, expiredOrders, expiringThisMonth, materialRequirements] =
    await Promise.all([
      getOrders(),
      getExpiredOrders(),
      getOrdersExpiringThisMonth(),
      getMaterialRequirements(),
    ]);

  return {
    expiredOrders,
    expiringThisMonth,
    materialRequirements,
    orders,
  };
}
