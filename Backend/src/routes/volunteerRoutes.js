import express from "express";
import {
  submitVolunteer,
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
} from "../controllers/volunteerController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", formLimiter, submitVolunteer);
router.get("/", protect, isAdmin, getVolunteers);
router.patch("/:id/status", protect, isAdmin, updateVolunteerStatus);
router.delete("/:id", protect, isAdmin, deleteVolunteer);

export default router;
