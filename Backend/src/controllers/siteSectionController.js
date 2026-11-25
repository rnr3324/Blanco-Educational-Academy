import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import SiteSection from "../models/SiteSection.js";
import { deleteStoredImage } from "../config/cloudinary.js";

const editableFields = [
  "page", "placement", "eyebrow", "title", "body", "image", "imagePublicId", "buttonLabel", "buttonUrl", "order", "isActive",
];

const pickEditableFields = (body) => Object.fromEntries(
  editableFields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
);

export const getPublicSiteSections = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (["home", "about"].includes(req.query.page)) filter.page = req.query.page;
  const sections = await SiteSection.find(filter).sort({ page: 1, order: 1, createdAt: 1 });
  res.status(200).json({ success: true, count: sections.length, data: sections });
});

export const getAdminSiteSections = asyncHandler(async (req, res) => {
  const sections = await SiteSection.find().sort({ page: 1, order: 1, createdAt: 1 });
  res.status(200).json({ success: true, count: sections.length, data: sections });
});

export const createSiteSection = asyncHandler(async (req, res) => {
  const section = await SiteSection.create(pickEditableFields(req.body));
  res.status(201).json({ success: true, data: section });
});

export const updateSiteSection = asyncHandler(async (req, res, next) => {
  const current = await SiteSection.findById(req.params.id);
  if (!current) return next(new ErrorResponse("Site section not found", 404));
  const section = await SiteSection.findByIdAndUpdate(
    req.params.id,
    pickEditableFields(req.body),
    { new: true, runValidators: true }
  );
  if (req.body.imagePublicId !== undefined && req.body.imagePublicId !== current.imagePublicId) await deleteStoredImage(current.imagePublicId);
  res.status(200).json({ success: true, data: section });
});

export const deleteSiteSection = asyncHandler(async (req, res, next) => {
  const section = await SiteSection.findByIdAndDelete(req.params.id);
  if (!section) return next(new ErrorResponse("Site section not found", 404));
  await deleteStoredImage(section.imagePublicId);
  res.status(200).json({ success: true, message: "Site section deleted" });
});
