import express from "express";
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", formLimiter, submitApplication);
router.get("/", protect, isAdmin, getApplications);
router.patch("/:id/status", protect, isAdmin, updateApplicationStatus);
router.delete("/:id", protect, isAdmin, deleteApplication);

export default router;
