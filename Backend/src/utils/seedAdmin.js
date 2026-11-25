import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ override: true });
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedDatabase = async () => {
  try {
    // 1. Validate environment variables
    const requiredEnv = [
      "MONGO_URI",
      "ADMIN_NAME",
      "ADMIN_EMAIL",
      "ADMIN_PASSWORD",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        throw new Error(`${key} is missing in .env file`);
      }
    }
    if (process.env.ADMIN_PASSWORD.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters long");
    }

    // 2. Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    // 3. Get admin details from .env
    const adminData = {
      name: process.env.ADMIN_NAME.trim(),
      email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      role: "admin",
    };

    // Existing credentials are only changed when the operator explicitly opts in.
    const existingUser = await User.findOne({ email: adminData.email });
    let admin;

    if (existingUser) {
      if (process.env.ADMIN_RESET !== "true") {
        console.log("An account already exists for ADMIN_EMAIL; no changes made.");
        console.log("To reset its password and grant admin access, set ADMIN_RESET=true and rerun the seed command.");
        return;
      }

      existingUser.name = adminData.name;
      existingUser.password = adminData.password;
      existingUser.role = "admin";
      existingUser.passwordChangedAt = new Date();
      admin = await existingUser.save();
      console.log("Configured account updated with admin access and a new password.");
    } else {
      admin = await User.create(adminData);
      console.log("Academy admin created successfully.");
    }

    console.log("--------------------------------");
    console.log("Admin ID:", admin._id);
    console.log("Email:", admin.email);
    console.log("--------------------------------");

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
  }
};

seedDatabase();
