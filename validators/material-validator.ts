import { z } from "zod";

export const materialSchema = z.object({
  description: z.string().trim().optional(),
  name: z.string().trim().min(1),
  price: z.coerce.number().min(0),
  unit: z.string().trim().min(1),
});

export const materialUsageSchema = z.object({
  materialId: z.string().trim().min(1),
  orderId: z.string().trim().min(1),
  plannedQuantity: z.coerce.number().min(0),
  priceSnapshot: z.coerce.number().min(0).optional(),
  usedQuantity: z.coerce.number().min(0),
});

export type IMaterialInput = z.infer<typeof materialSchema>;
export type IMaterialUsageInput = z.infer<typeof materialUsageSchema>;
