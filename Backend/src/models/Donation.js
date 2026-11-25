import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    amount: { type: Number, required: true, min: 1 },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      default: null,
    },
    campaignTitle: { type: String, default: "General Donation" },
    method: {
      type: String,
      enum: ["UPI", "Card", "NetBanking", "Wallet", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
