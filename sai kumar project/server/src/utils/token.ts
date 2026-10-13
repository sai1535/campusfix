import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
};

export const generateAccessToken = (user: IUser) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    requireEnv(process.env.JWT_SECRET, "JWT_SECRET"),
    { expiresIn: "15m" }
  );

export const generateRefreshToken = (user: IUser) =>
  jwt.sign(
    { sub: user._id.toString() },
    requireEnv(process.env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET"),
    { expiresIn: "7d" }
  );


