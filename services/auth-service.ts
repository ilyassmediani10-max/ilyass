import { UserModel } from "@/models/user-model";
import type { UserRole } from "@/types/auth-t";
import { connectMongoose } from "@/utils/mongoose-client";
import { hashPassword, verifyPassword } from "@/utils/password";
import { createSessionCookie } from "@/utils/session-cookie";
import type { AuthInput } from "@/validators/auth-validator";

export async function signIn(input: AuthInput) {
  const email = input.email.trim().toLowerCase();

  await connectMongoose();

  const user = await UserModel.findOne({ email });

  if (!user || !verifyPassword(input.password, user.passwordHash)) {
    throw new Error("Invalid email or password.");
  }

  const cookie = await createSessionCookie({
    email: user.email,
    name: user.name,
    role: user.role,
    sub: user._id.toString(),
  });

  return {
    cookie,
    role: user.role,
  };
}

export async function signUp(input: AuthInput) {
  const email = input.email.trim().toLowerCase();
  const name = input.name?.trim() ?? "";

  if (!name) {
    throw new Error("Name is required.");
  }

  await connectMongoose();

  const existingUser = await UserModel.findOne({ email }).lean();

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const role: UserRole = (await UserModel.countDocuments()) === 0 ? "ADMIN" : "USER";
  const user = await UserModel.create({
    email,
    name,
    passwordHash: hashPassword(input.password),
    role,
  });
  const cookie = await createSessionCookie({
    email: user.email,
    name: user.name,
    role: user.role,
    sub: user._id.toString(),
  });

  return {
    cookie,
    role,
  };
}
