import mongoose, { Schema, type Model } from "mongoose";
import type { Client } from "@/types/client-t";

const clientSchema = new Schema<Client>(
  {
    number: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    status: { type: String, default: "", trim: true },
    totalSpent: { type: String, default: "", trim: true },
    lastOrder: { type: String, default: "", trim: true },
    deadline: { type: String, default: "", trim: true },
  },
  {
    collection: "clients",
    timestamps: true,
    versionKey: false,
  },
);

export const ClientModel =
  (mongoose.models.Client as Model<Client>) ??
  mongoose.model<Client>("Client", clientSchema);
