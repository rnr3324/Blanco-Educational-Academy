import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: "🎒" },
    description: { type: String, required: true },
    target: { type: Number, required: true, min: 1 },
    raised: { type: Number, default: 0 },
    donors: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    daysLeft: { type: Number, default: 30 },
    scheduledAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    isArchived: { type: Boolean, default: false },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
