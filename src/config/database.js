import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
