import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getPublicSiteSections,
  getAdminSiteSections,
  createSiteSection,
  updateSiteSection,
  deleteSiteSection,
} from "../controllers/siteSectionController.js";
import validateImagePayload from "../middleware/validateImagePayload.js";

const router = express.Router();

router.get("/", getPublicSiteSections);
router.get("/admin", protect, isAdmin, getAdminSiteSections);
router.post("/", protect, isAdmin, validateImagePayload, createSiteSection);
router.put("/:id", protect, isAdmin, validateImagePayload, updateSiteSection);
router.delete("/:id", protect, isAdmin, deleteSiteSection);

export default router;
