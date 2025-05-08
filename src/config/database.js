import mongoose from "mongoose";

export async function connectToDatabase() {
  const dbUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_URI_TEST
      : process.env.MONGODB_URI;

  if (!dbUri) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri);
    console.log(`Connected to database (${process.env.NODE_ENV})`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
