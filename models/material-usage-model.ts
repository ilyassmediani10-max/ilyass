import mongoose, { Schema, type Model } from "mongoose";
import type { MaterialUsage } from "@/types/material-t";

const materialUsageSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    materialId: { type: Schema.Types.ObjectId, ref: "Material", required: true },
    usedQuantity: { type: Number, required: true, min: 0 },
    plannedQuantity: { type: Number, required: true, min: 0 },
    priceSnapshot: { type: Number, required: true, min: 0 },
  },
  {
    collection: "materialUsages",
    timestamps: true,
    versionKey: false,
  },
);

export const MaterialUsageModel =
  (mongoose.models.MaterialUsage as Model<MaterialUsage>) ??
  mongoose.model<MaterialUsage>("MaterialUsage", materialUsageSchema);
