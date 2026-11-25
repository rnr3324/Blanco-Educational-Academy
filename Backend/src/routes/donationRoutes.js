import express from "express";
import {
  createDonation,
  getDonations,
  getDonationStats,
  updateDonationStatus,
  deleteDonation,
} from "../controllers/donationController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", formLimiter, createDonation);
router.get("/", protect, isAdmin, getDonations);
router.get("/stats", protect, isAdmin, getDonationStats);
router.patch("/:id/status", protect, isAdmin, updateDonationStatus);
router.delete("/:id", protect, isAdmin, deleteDonation);

export default router;
