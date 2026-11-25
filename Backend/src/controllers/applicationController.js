import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import ProgramApplication from "../models/ProgramApplication.js";

export const submitApplication = asyncHandler(async (req, res) => {
  const application = await ProgramApplication.create({
    studentName: req.body.studentName,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    location: req.body.location,
    programId: req.body.programId || null,
    programTitle: req.body.programTitle || "",
    status: "pending",
  });
  res.status(201).json({ success: true, data: application });
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await ProgramApplication.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
  });
});

export const updateApplicationStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const application = await ProgramApplication.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!application) return next(new ErrorResponse("Application not found", 404));
  res.status(200).json({ success: true, data: application });
});

export const deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await ProgramApplication.findById(req.params.id);
  if (!application) return next(new ErrorResponse("Application not found", 404));
  await application.deleteOne();
  res.status(200).json({ success: true, message: "Application deleted" });
});
