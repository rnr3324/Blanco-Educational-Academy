import express from "express";
import {
  getEvents,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import validateImagePayload from "../middleware/validateImagePayload.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/all", protect, isAdmin, getAllEvents);
router.get("/:id", getEvent);
router.post("/", protect, isAdmin, validateImagePayload, createEvent);
router.put("/:id", protect, isAdmin, validateImagePayload, updateEvent);
router.delete("/:id", protect, isAdmin, deleteEvent);

export default router;
