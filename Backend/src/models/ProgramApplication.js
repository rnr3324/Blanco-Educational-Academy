import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    age: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      default: null,
    },
    programTitle: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ProgramApplication = mongoose.model(
  "ProgramApplication",
  applicationSchema
);
export default ProgramApplication;
