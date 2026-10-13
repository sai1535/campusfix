import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "user" | "admin" | "student";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "student"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);


