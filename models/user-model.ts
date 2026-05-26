import mongoose, { Schema, type Model } from "mongoose";
import type { UserRole } from "@/types/auth-t";

export type UserDocument = {
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
};

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], required: true },
  },
  { timestamps: true },
);

export const UserModel =
  (mongoose.models.User as Model<UserDocument> | undefined) ??
  mongoose.model<UserDocument>("User", UserSchema);
