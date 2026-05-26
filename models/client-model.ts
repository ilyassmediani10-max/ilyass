import mongoose, { Schema, type Model } from "mongoose";
import type { Client } from "@/types/client-t";

const clientSchema = new Schema<Client>(
  {
    apartment: { type: Number, required: true, min: 0 },
    city: { type: String, required: true, trim: true },
    clientNumber: { type: Number, required: true, unique: true, min: 1 },
    firstName: { type: String, required: true, trim: true },
    houseNumber: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
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
