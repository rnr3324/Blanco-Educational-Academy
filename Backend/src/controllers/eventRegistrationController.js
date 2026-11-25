import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";

export const submitEventRegistration = asyncHandler(async (req, res) => {
  const event = req.body.eventId ? await Event.findById(req.body.eventId) : null;
  if (!event || !event.isActive || event.type !== "upcoming") {
    throw new ErrorResponse("This event is not accepting registrations.", 400);
  }
  const capacity = event.capacity || event.seats;
  if (capacity > 0 && event.registered >= capacity) {
    throw new ErrorResponse("This event is full.", 409);
  }
  const registration = await EventRegistration.create({
    eventId: event._id,
    eventTitle: event.title,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    status: "pending",
  });
  if (registration.eventId) {
    await Event.findByIdAndUpdate(registration.eventId, { $inc: { registered: 1 } });
  }
  res.status(201).json({ success: true, data: registration });
});

export const getEventRegistrations = asyncHandler(async (req, res) => {
  const registrations = await EventRegistration.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: registrations.length, data: registrations });
});

export const updateEventRegistrationStatus = asyncHandler(async (req, res, next) => {
  const registration = await EventRegistration.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!registration) return next(new ErrorResponse("Event registration not found", 404));
  res.status(200).json({ success: true, data: registration });
});

export const deleteEventRegistration = asyncHandler(async (req, res, next) => {
  const registration = await EventRegistration.findById(req.params.id);
  if (!registration) return next(new ErrorResponse("Event registration not found", 404));
  if (registration.eventId) {
    await Event.findByIdAndUpdate(registration.eventId, { $inc: { registered: -1 } });
  }
  await registration.deleteOne();
  res.status(200).json({ success: true, message: "Registration deleted" });
});
