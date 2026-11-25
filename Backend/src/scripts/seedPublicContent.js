import "dotenv/config";
import mongoose from "mongoose";
import initialContent from "../seeds/initial-content.json" with { type: "json" };
import Program from "../models/Program.js";
import Campaign from "../models/Campaign.js";
import Event from "../models/Event.js";
import Gallery from "../models/Gallery.js";

const collections = [
  ["programs", Program],
  ["campaigns", Campaign],
  ["events", Event],
  ["gallery", Gallery],
];

try {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  await mongoose.connect(process.env.MONGO_URI);

  for (const [key, Model] of collections) {
    const existingTitles = new Set(
      (await Model.find({}, { title: 1, _id: 0 }).lean()).map(({ title }) => title)
    );
    const missing = initialContent[key].filter((item) => !existingTitles.has(item.title));

    if (missing.length) await Model.insertMany(missing);
    console.log(`${key}: added ${missing.length} initial items`);
  }
} catch (error) {
  console.error("Public content seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
