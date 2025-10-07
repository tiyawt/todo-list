import mongoose from "mongoose";

export async function connectDB() {
  console.log("🚀 connectDB() called");        // debug
  console.log("Using URI:", process.env.MONGO_URI); // debug

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
