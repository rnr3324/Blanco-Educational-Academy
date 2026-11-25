import express from "express";
import {
  getPrograms,
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import validateImagePayload from "../middleware/validateImagePayload.js";

const router = express.Router();

router.get("/", getPrograms);
router.get("/all", protect, isAdmin, getAllPrograms);
router.get("/:id", getProgram);
router.post("/", protect, isAdmin, validateImagePayload, createProgram);
router.put("/:id", protect, isAdmin, validateImagePayload, updateProgram);
router.delete("/:id", protect, isAdmin, deleteProgram);

export default router;
