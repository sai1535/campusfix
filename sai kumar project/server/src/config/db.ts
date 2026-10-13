import mongoose from "mongoose";

export const connectDb = async (uri: string) => {
  if (!uri) {
    console.warn("⚠️  Missing Mongo connection string - server will start without database");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("🗃️  MongoDB connected");
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed - server will start without database");
    console.warn("   To fix: Install MongoDB locally or use MongoDB Atlas (cloud)");
    console.warn("   Connection string:", uri);
    // Don't throw - allow server to start without DB for development
  }
};


