import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User, IUser } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "student"]).default("user").transform((val) => val === "student" ? "user" : val),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: parsed.error.flatten() 
      });
    }

    const { name, email, password, role } = parsed.data.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: "Database not available. Please set up MongoDB to register users." 
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const access = generateAccessToken(user);
    const refresh = generateRefreshToken(user);

    res.status(201).json({
      user: formatUser(user),
      tokens: { access, refresh },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.name === "MongooseError" || error.name === "MongoServerError") {
      return res.status(503).json({ 
        message: "Database connection error. Please ensure MongoDB is running." 
      });
    }
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: parsed.error.flatten() 
      });
    }

    const { email, password } = parsed.data.body;

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: "Database not available. Please set up MongoDB to login." 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const access = generateAccessToken(user);
    const refresh = generateRefreshToken(user);

    res.json({
      user: formatUser(user),
      tokens: { access, refresh },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.name === "MongooseError" || error.name === "MongoServerError") {
      return res.status(503).json({ 
        message: "Database connection error. Please ensure MongoDB is running." 
      });
    }
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh } = req.body as { refresh?: string };
  if (!refresh) {
    return res.status(400).json({ message: "Missing refresh token" });
  }

  try {
    const payload = jwt.verify(
      refresh,
      process.env.JWT_REFRESH_SECRET ?? ""
    ) as { sub: string };

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const access = generateAccessToken(user);
    const newRefresh = generateRefreshToken(user);

    res.json({ user: formatUser(user), tokens: { access, refresh: newRefresh } });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const formatUser = (user: IUser) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});


