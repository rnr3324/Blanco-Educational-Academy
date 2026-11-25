import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", formLimiter, submitContact);
router.get("/", protect, isAdmin, getContacts);
router.patch("/:id/status", protect, isAdmin, updateContactStatus);
router.delete("/:id", protect, isAdmin, deleteContact);

export default router;
