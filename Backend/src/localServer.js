import dotenv from "dotenv";

// For local development, prefer this project's .env over machine-level settings.
dotenv.config({ override: true });
await import("./server.js");
