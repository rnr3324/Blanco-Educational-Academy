import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";
import { getAdminCookie } from "../utils/authCookie.js";
import { allowedOrigins } from "../config/origins.js";

export const protect = asyncHandler(async (req, res, next) => {
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method) && req.headers.origin && !allowedOrigins.includes(req.headers.origin)) {
    return next(new ErrorResponse("Request origin is not allowed", 403));
  }
  let token = getAdminCookie(req);

  if (
    !token && req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorised — no token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ErrorResponse("User not found", 401));
    }

    if (req.user.passwordChangedAt && decoded.iat * 1000 < req.user.passwordChangedAt.getTime()) {
      return next(new ErrorResponse("Session expired. Please sign in again.", 401));
    }

    next();
  } catch {
    return next(new ErrorResponse("Token invalid or expired", 401));
  }
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return next(new ErrorResponse("Access denied — admins only", 403));
};
