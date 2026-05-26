import { z } from "zod";
import { orderStatuses } from "@/constants/order-status";

export const orderSchema = z.object({
  clientId: z.string().trim().min(1, "Choose a client."),
  deadline: z.iso.date("Enter a valid deadline."),
  number: z.string().trim().min(1, "Enter an order number."),
  orderDate: z.iso.date("Enter a valid order date."),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  service: z.string().trim().min(1, "Enter a service."),
  status: z.enum(orderStatuses, "Choose a valid status."),
});

export type IOrderInput = z.infer<typeof orderSchema>;
