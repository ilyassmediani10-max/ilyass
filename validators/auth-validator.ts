import { z } from "zod";

const email = z.string().trim().email("Enter a valid email address.");
const password = z.string().min(6, "Password must be at least 6 characters.");

export const signInSchema = z.object({
  email,
  password,
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(1, "Enter your name."),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type AuthInput = SignInInput | SignUpInput;
