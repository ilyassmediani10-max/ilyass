import mongoose, { Schema, type Model } from "mongoose";
import { orderStatuses } from "@/constants/order-status";
import type { Order } from "@/types/order-t";

const orderSchema = new Schema(
  {
    number: { type: String, required: true, unique: true, trim: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    service: { type: String, required: true, trim: true },
    orderDate: { type: String, required: true, trim: true },
    deadline: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: orderStatuses, required: true, trim: true },
  },
  {
    collection: "orders",
    timestamps: true,
    versionKey: false,
  },
);

export const OrderModel =
  (mongoose.models.Order as Model<Order>) ??
  mongoose.model<Order>("Order", orderSchema);
