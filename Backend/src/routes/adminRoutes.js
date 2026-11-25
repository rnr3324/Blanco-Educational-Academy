import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { loginAdmin, logoutAdmin, getAdminProfile, changeAdminPassword, changeAdminCredentials, getApiLogs } from "../controllers/adminController.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { uploadAdminImage } from "../controllers/imageController.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/login", authLimiter, loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", protect, isAdmin, getAdminProfile);
router.patch("/password", protect, isAdmin, changeAdminPassword);
router.patch("/credentials", protect, isAdmin, changeAdminCredentials);
router.get("/logs", protect, isAdmin, getApiLogs);
router.post("/images", protect, isAdmin, uploadLimiter, uploadAdminImage);

export default router;
