import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Server will keep running, but DB-dependent routes will fail until MongoDB is reachable.");
  }
};
