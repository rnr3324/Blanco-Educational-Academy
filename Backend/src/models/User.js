import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+$/, "Enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 12,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordChangedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
