import dotenv from "dotenv";

import app from "./app";
import { connectDb } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await connectDb(process.env.MONGODB_URI ?? "");
    app.listen(PORT, () => {
      console.log(`🚀 API running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

bootstrap();


