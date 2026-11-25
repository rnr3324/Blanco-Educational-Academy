import asyncHandler from "../utils/asyncHandler.js";
import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";
import ErrorResponse from "../utils/errorResponse.js";

export const createDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.create({
    donorName: req.body.donorName,
    email: req.body.email,
    phone: req.body.phone,
    amount: Number(req.body.amount),
    campaignId: req.body.campaignId || null,
    campaignTitle: req.body.campaignTitle || "General Donation",
    method: "Other",
    status: "pending",
    message: req.body.message,
  });

  // Update campaign raised amount if linked
  if (donation.campaignId && donation.status === "completed") {
    await Campaign.findByIdAndUpdate(donation.campaignId, {
      $inc: { raised: donation.amount, donors: 1 },
    });
  }

  res.status(201).json({ success: true, data: donation });
});

export const updateDonationStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  if (!["pending", "completed", "failed"].includes(status)) {
    return next(new ErrorResponse("Invalid donation status", 400));
  }

  const donation = await Donation.findById(req.params.id);
  if (!donation) return next(new ErrorResponse("Donation not found", 404));

  const wasCompleted = donation.status === "completed";
  donation.status = status;
  await donation.save();

  if (donation.campaignId && wasCompleted !== (status === "completed")) {
    const direction = status === "completed" ? 1 : -1;
    await Campaign.findByIdAndUpdate(donation.campaignId, {
      $inc: { raised: direction * donation.amount, donors: direction },
    });
  }

  res.status(200).json({ success: true, data: donation });
});

export const deleteDonation = asyncHandler(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) return next(new ErrorResponse("Donation not found", 404));
  if (donation.campaignId && donation.status === "completed") {
    await Campaign.findByIdAndUpdate(donation.campaignId, {
      $inc: { raised: -donation.amount, donors: -1 },
    });
  }
  await donation.deleteOne();
  res.status(200).json({ success: true, message: "Donation deleted" });
});

export const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: donations.length, data: donations });
});

export const getDonationStats = asyncHandler(async (req, res) => {
  const totalDonations = await Donation.countDocuments({ status: "completed" });
  const totalAmountResult = await Donation.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const totalAmount = totalAmountResult[0]?.total || 0;

  const thisMonth = new Date();
  thisMonth.setDate(1);
  const monthlyResult = await Donation.aggregate([
    { $match: { status: "completed", createdAt: { $gte: thisMonth } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const monthlyAmount = monthlyResult[0]?.total || 0;

  res.status(200).json({
    success: true,
    data: { totalDonations, totalAmount, monthlyAmount },
  });
});
