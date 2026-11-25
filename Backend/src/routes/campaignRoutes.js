import express from "express";
import {
  getCampaigns,
  getAllCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import validateImagePayload from "../middleware/validateImagePayload.js";

const router = express.Router();

router.get("/", getCampaigns);
router.get("/all", protect, isAdmin, getAllCampaigns);
router.get("/:id", getCampaign);
router.post("/", protect, isAdmin, validateImagePayload, createCampaign);
router.put("/:id", protect, isAdmin, validateImagePayload, updateCampaign);
router.delete("/:id", protect, isAdmin, deleteCampaign);

export default router;
