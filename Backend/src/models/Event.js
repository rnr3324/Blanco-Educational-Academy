import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: "📅" },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    capacity: { type: Number, default: 0 },
    seats: { type: Number, default: 0 },
    registered: { type: Number, default: 0 },
    beneficiaries: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
