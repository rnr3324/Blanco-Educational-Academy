import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Event from "../models/Event.js";
import { deleteStoredImage } from "../config/cloudinary.js";

export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ isActive: true }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: events.length, data: events });
});

export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: events.length, data: events });
});

export const getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) return next(new ErrorResponse("Event not found", 404));
  res.status(200).json({ success: true, data: event });
});

export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, data: event });
});

export const updateEvent = asyncHandler(async (req, res, next) => {
  const current = await Event.findById(req.params.id);
  if (!current) return next(new ErrorResponse("Event not found", 404));
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (req.body.imagePublicId !== undefined && req.body.imagePublicId !== current.imagePublicId) await deleteStoredImage(current.imagePublicId);
  res.status(200).json({ success: true, data: event });
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) return next(new ErrorResponse("Event not found", 404));
  await event.deleteOne();
  await deleteStoredImage(event.imagePublicId);
  res.status(200).json({ success: true, message: "Event deleted" });
});
