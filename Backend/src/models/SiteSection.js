import mongoose from "mongoose";

const siteSectionSchema = new mongoose.Schema(
  {
    page: { type: String, enum: ["home", "about"], required: true, index: true },
    placement: { type: String, enum: ["content", "hero"], default: "content", index: true },
    eyebrow: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    buttonLabel: { type: String, default: "" },
    buttonUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSection", siteSectionSchema);
