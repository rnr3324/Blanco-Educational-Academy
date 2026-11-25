import express from "express";
import {
  getGallery,
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import validateImagePayload from "../middleware/validateImagePayload.js";

const router = express.Router();

router.get("/", getGallery);
router.get("/all", protect, isAdmin, getAllGallery);
router.post("/", protect, isAdmin, validateImagePayload, createGalleryItem);
router.put("/:id", protect, isAdmin, validateImagePayload, updateGalleryItem);
router.delete("/:id", protect, isAdmin, deleteGalleryItem);

export default router;
