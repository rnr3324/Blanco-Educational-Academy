import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiter.js";
import {
  submitEventRegistration,
  getEventRegistrations,
  updateEventRegistrationStatus,
  deleteEventRegistration,
} from "../controllers/eventRegistrationController.js";

const router = express.Router();
router.post("/", formLimiter, submitEventRegistration);
router.get("/", protect, isAdmin, getEventRegistrations);
router.patch("/:id/status", protect, isAdmin, updateEventRegistrationStatus);
router.delete("/:id", protect, isAdmin, deleteEventRegistration);
export default router;
