import { z } from "zod";

export const authSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(1).optional(),
  password: z.string().min(6),
});

export type AuthInput = z.infer<typeof authSchema>;
