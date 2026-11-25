import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: "📚" },
    description: { type: String, required: true },
    ageGroup: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true },
    schedule: { type: String, required: true },
    seats: { type: Number, required: true, min: 1 },
    enrolled: { type: Number, default: 0 },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);
export default Program;
