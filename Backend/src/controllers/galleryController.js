import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Gallery from "../models/Gallery.js";
import { deleteStoredImage } from "../config/cloudinary.js";

export const getGallery = asyncHandler(async (req, res) => {
  const items = await Gallery.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: items.length, data: items });
});

export const getAllGallery = asyncHandler(async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: items.length, data: items });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateGalleryItem = asyncHandler(async (req, res, next) => {
  const current = await Gallery.findById(req.params.id);
  if (!current) return next(new ErrorResponse("Gallery item not found", 404));
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (req.body.imagePublicId !== undefined && req.body.imagePublicId !== current.imagePublicId) await deleteStoredImage(current.imagePublicId);
  res.status(200).json({ success: true, data: item });
});

export const deleteGalleryItem = asyncHandler(async (req, res, next) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return next(new ErrorResponse("Gallery item not found", 404));
  await item.deleteOne();
  await deleteStoredImage(item.imagePublicId);
  res.status(200).json({ success: true, message: "Gallery item deleted" });
});
