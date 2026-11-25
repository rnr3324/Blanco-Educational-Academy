
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      authSource: "admin",
      serverSelectionTimeoutMS: 30000,
    });

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    throw error;
  }
};

export default connectDB;
