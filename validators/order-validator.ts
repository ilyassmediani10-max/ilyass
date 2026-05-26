import { z } from "zod";

export const orderSchema = z.object({
  clientId: z.string().trim().min(1),
  deadline: z.string().trim().min(1),
  number: z.string().trim().min(1),
  orderDate: z.string().trim().min(1),
  price: z.coerce.number().min(0),
  service: z.string().trim().min(1),
  status: z.string().trim().min(1),
});

export type IOrderInput = z.infer<typeof orderSchema>;
