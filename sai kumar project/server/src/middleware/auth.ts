import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { IUser } from "../models/User";

// Auth middleware for JWT token verification and role-based access control

interface AccessTokenPayload {
  sub: string;
  email: string;
  role: IUser["role"];
  name: string;
}

export const authenticate =
  (roles: IUser["role"][] = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = header.split(" ")[1];
      const secretEnv = process.env.JWT_SECRET;
      if (!secretEnv) {
        return res.status(500).json({ message: "Server configuration error" });
      }

      const decoded = jwt.verify(token, secretEnv!);
      const payload = decoded as unknown as AccessTokenPayload;

      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = {
        _id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: payload.name,
      } as any;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };

