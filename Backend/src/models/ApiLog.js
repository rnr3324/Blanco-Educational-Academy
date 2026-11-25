import mongoose from "mongoose";

const apiLogSchema = new mongoose.Schema({
  requestId: { type: String, required: true, index: true },
  method: { type: String, required: true, index: true },
  path: { type: String, required: true, index: true },
  statusCode: { type: Number, required: true, index: true },
  durationMs: { type: Number, required: true },
  ip: { type: String, default: "" },
  origin: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  adminEmail: { type: String, default: "" },
}, { timestamps: true });

apiLogSchema.index({ createdAt: -1 });

export default mongoose.model("ApiLog", apiLogSchema);
