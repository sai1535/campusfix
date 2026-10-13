import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";

import router from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL?.split(",") ?? "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

if (process.env.UPLOAD_DIR) {
  const uploadPath = path.join(process.cwd(), process.env.UPLOAD_DIR);
  app.use("/uploads", express.static(uploadPath));
}

app.get("/", (_req, res) => {
  res.json({
    message: "CampusFix API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api",
      auth: "/api/auth",
      issues: "/api/issues",
      dashboard: "/api/dashboard",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

export default app;


