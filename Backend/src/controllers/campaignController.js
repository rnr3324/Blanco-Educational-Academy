import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Campaign from "../models/Campaign.js";
import { deleteStoredImage } from "../config/cloudinary.js";

export const getCampaigns = asyncHandler(async (req, res) => {
  const now = new Date();
  const campaigns = await Campaign.find({
    isActive: true,
    isArchived: { $ne: true },
    $and: [
      { $or: [{ scheduledAt: null }, { scheduledAt: { $lte: now } }] },
      { $or: [{ endsAt: null }, { endsAt: { $gte: now } }] },
    ],
  }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: campaigns.length, data: campaigns });
});

export const getAllCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: campaigns.length, data: campaigns });
});

export const getCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return next(new ErrorResponse("Campaign not found", 404));
  res.status(200).json({ success: true, data: campaign });
});

export const createCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.create(req.body);
  res.status(201).json({ success: true, data: campaign });
});

export const updateCampaign = asyncHandler(async (req, res, next) => {
  const current = await Campaign.findById(req.params.id);
  if (!current) return next(new ErrorResponse("Campaign not found", 404));
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (req.body.imagePublicId !== undefined && req.body.imagePublicId !== current.imagePublicId) await deleteStoredImage(current.imagePublicId);
  res.status(200).json({ success: true, data: campaign });
});

export const deleteCampaign = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return next(new ErrorResponse("Campaign not found", 404));
  await campaign.deleteOne();
  await deleteStoredImage(campaign.imagePublicId);
  res.status(200).json({ success: true, message: "Campaign deleted" });
});
