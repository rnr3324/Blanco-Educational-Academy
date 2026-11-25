import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import ErrorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiLog from "../models/ApiLog.js";
import { setAdminCookie, clearAdminCookie, adminSessionMaxAge } from "../utils/authCookie.js";

// @desc  Admin login
// @route POST /api/admin/login
// @access Public (but only admins can login)
export const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password || password.length > 128) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Ensure user is admin
  if (user.role !== "admin") {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
  setAdminCookie(res, token);
  res.status(200).json({ success: true, expiresIn: adminSessionMaxAge, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  clearAdminCookie(res);
  res.status(200).json({ success: true, message: "Signed out" });
});

export const changeAdminPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 12 || newPassword.length > 128) {
    return next(new ErrorResponse("New password must be between 12 and 128 characters.", 400));
  }

  const user = await User.findById(req.user._id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return next(new ErrorResponse("Current password is incorrect.", 401));
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.passwordChangedAt = new Date();
  await user.save();
  clearAdminCookie(res);
  res.status(200).json({ success: true, message: "Password updated. Sign in again with your new password." });
});

export const changeAdminCredentials = asyncHandler(async (req, res, next) => {
  const { currentPassword, email, newPassword } = req.body;
  if (typeof currentPassword !== "string" || typeof email !== "string" || !email.trim() || typeof newPassword !== "string" || newPassword.length < 12 || newPassword.length > 128) {
    return next(new ErrorResponse("Provide your current password, a valid email, and a new password of 12–128 characters.", 400));
  }

  const user = await User.findById(req.user._id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return next(new ErrorResponse("Current password is incorrect.", 401));
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+$/.test(normalizedEmail)) {
    return next(new ErrorResponse("Enter a valid email address.", 400));
  }
  const emailInUse = await User.exists({ email: normalizedEmail, _id: { $ne: user._id } });
  if (emailInUse) return next(new ErrorResponse("That email address is already in use.", 409));

  user.email = normalizedEmail;
  user.password = await bcrypt.hash(newPassword, 12);
  user.passwordChangedAt = new Date();
  await user.save();
  clearAdminCookie(res);
  res.status(200).json({ success: true, message: "Login details updated. Sign in again with your new email and password." });
});

// @desc  Get admin profile
// @route GET /api/admin/profile
// @access Private (admin only)
export const getAdminProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export const getApiLogs = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 25));
  const filter = {};
  if (req.query.method) filter.method = String(req.query.method).toUpperCase().slice(0, 10);
  if (req.query.status === "error") filter.statusCode = { $gte: 400 };
  else if (req.query.status === "success") filter.statusCode = { $lt: 400 };
  if (req.query.search) {
    const term = String(req.query.search).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.path = { $regex: term, $options: "i" };
  }

  const [logs, total] = await Promise.all([
    ApiLog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    ApiLog.countDocuments(filter),
  ]);
  res.status(200).json({ success: true, data: logs, page, limit, total, totalPages: Math.ceil(total / limit) });
});
