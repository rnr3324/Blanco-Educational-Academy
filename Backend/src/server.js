
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import app from "./app.js";
import connectDB from "./config/db.js";
import validateEnv from "./config/validateEnv.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    validateEnv();
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log("================================");
      console.log("BLANCO EDUCATIONAL ACADEMY BACKEND");
      console.log("================================");
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log("MongoDB: Connected");
      console.log("================================");
    });

    const shutdown = (signal) => {
      console.log(`${signal} received; closing HTTP server`);
      server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
      });
    };
    process.once("SIGTERM", shutdown);
    process.once("SIGINT", shutdown);
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
