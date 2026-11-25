import asyncHandler from "../utils/asyncHandler.js";
import { uploadImage } from "../config/cloudinary.js";

export const uploadAdminImage = asyncHandler(async (req, res) => {
  const data = await uploadImage(req.body.image);
  res.status(201).json({ success: true, ...data });
});
