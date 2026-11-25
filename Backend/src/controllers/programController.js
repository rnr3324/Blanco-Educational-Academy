import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Program from "../models/Program.js";
import { deleteStoredImage } from "../config/cloudinary.js";

// GET /api/programs  (public)
export const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find({ isActive: true }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: programs.length, data: programs });
});

// GET /api/programs/all  (admin)
export const getAllPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: programs.length, data: programs });
});

// GET /api/programs/:id  (public)
export const getProgram = asyncHandler(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) return next(new ErrorResponse("Program not found", 404));
  res.status(200).json({ success: true, data: program });
});

// POST /api/programs  (admin)
export const createProgram = asyncHandler(async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json({ success: true, data: program });
});

// PUT /api/programs/:id  (admin)
export const updateProgram = asyncHandler(async (req, res, next) => {
  const current = await Program.findById(req.params.id);
  if (!current) return next(new ErrorResponse("Program not found", 404));
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (req.body.imagePublicId !== undefined && req.body.imagePublicId !== current.imagePublicId) await deleteStoredImage(current.imagePublicId);
  res.status(200).json({ success: true, data: program });
});

// DELETE /api/programs/:id  (admin)
export const deleteProgram = asyncHandler(async (req, res, next) => {
  const program = await Program.findById(req.params.id);
  if (!program) return next(new ErrorResponse("Program not found", 404));
  await program.deleteOne();
  await deleteStoredImage(program.imagePublicId);
  res.status(200).json({ success: true, message: "Program deleted" });
});
