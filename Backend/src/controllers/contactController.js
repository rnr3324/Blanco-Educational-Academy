import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import Contact from "../models/Contact.js";

export const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    status: "new",
  });
  res.status(201).json({ success: true, data: contact });
});

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: contacts.length, data: contacts });
});

export const updateContactStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!contact) return next(new ErrorResponse("Contact not found", 404));
  res.status(200).json({ success: true, data: contact });
});

export const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return next(new ErrorResponse("Contact not found", 404));
  await contact.deleteOne();
  res.status(200).json({ success: true, message: "Contact deleted" });
});
