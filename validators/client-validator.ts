import { z } from "zod";

export const clientSchema = z.object({
  apartment: z.coerce.number().min(0),
  city: z.string().trim().min(1),
  clientNumber: z.coerce.number().min(1),
  firstName: z.string().trim().min(1),
  houseNumber: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  street: z.string().trim().min(1),
});

export type ClientInput = z.infer<typeof clientSchema>;
