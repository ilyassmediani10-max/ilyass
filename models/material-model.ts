import mongoose, { type Model } from "mongoose";
import type { Material } from "@/types/material-t";

const materialSchema = new mongoose.Schema<Material>(
  {
    name: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true, default: "" },
  },
  {
    timestamps: false,
  },
);

export const MaterialModel =
  (mongoose.models.Material as Model<Material>) ??
  mongoose.model<Material>("Material", materialSchema);
