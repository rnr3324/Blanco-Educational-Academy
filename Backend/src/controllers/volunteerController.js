import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Volunteer from "../models/Volunteer.js";

// Public POST
export const submitVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    skills: req.body.skills,
    motivation: req.body.motivation,
    availability: req.body.availability,
    status: "pending",
  });
  res.status(201).json({ success: true, data: volunteer });
});

// Admin GET all
export const getVolunteers = asyncHandler(async (req, res) => {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
});

// Admin PATCH status
export const updateVolunteerStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const volunteer = await Volunteer.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!volunteer) return next(new ErrorResponse("Volunteer not found", 404));
  res.status(200).json({ success: true, data: volunteer });
});

// Admin DELETE
export const deleteVolunteer = asyncHandler(async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id);
  if (!volunteer) return next(new ErrorResponse("Volunteer not found", 404));
  await volunteer.deleteOne();
  res.status(200).json({ success: true, message: "Volunteer deleted" });
});
