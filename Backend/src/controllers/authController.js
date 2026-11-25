import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";
import { setAdminCookie, adminSessionMaxAge } from "../utils/authCookie.js";

// @desc  Login admin
// @route POST /api/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password || password.length > 128) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user || user.role !== "admin") return next(new ErrorResponse("Invalid credentials", 401));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
  setAdminCookie(res, token);

  res.status(200).json({
    success: true,
    expiresIn: adminSessionMaxAge,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc  Get current logged-in admin
// @route GET /api/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
