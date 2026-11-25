
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import siteSectionRoutes from "./routes/siteSectionRoutes.js";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import mongoose from "mongoose";
import { allowedOrigins } from "./config/origins.js";
import apiLogger from "./middleware/apiLogger.js";

const app = express();
const trustProxy = process.env.TRUST_PROXY;
if (trustProxy === "true") app.set("trust proxy", true);
else if (trustProxy && Number.isInteger(Number(trustProxy))) app.set("trust proxy", Number(trustProxy));

// SECURITY MIDDLEWARE
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
app.use(apiLogger);

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const error = new Error("Origin is not allowed by CORS");
      error.statusCode = 403;
      return callback(error);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// BODY PARSER
app.use(express.json({ limit: "7mb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

// HEALTH CHECK ROUTES
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    brand: "Blanco Educational Academy",
    message: "Blanco Educational Academy API is active",
    status: "Healthy",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    brand: "Blanco Educational Academy",
    message: "Blanco Educational Academy REST API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    success: true,
    brand: "Blanco Educational Academy",
    status: databaseReady ? "Healthy" : "Unavailable",
    database: databaseReady ? "connected" : "disconnected",
    message: databaseReady ? "Backend server is running successfully" : "Database connection is unavailable",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiLimiter);

// Admin and public API lists must always return a body to Axios. Browser
// revalidation can otherwise yield 304 responses, which Axios rejects as errors.
app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store, private");
  delete req.headers["if-none-match"];
  delete req.headers["if-modified-since"];
  next();
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/content", siteSectionRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);

// 404 HANDLER (MUST BE LAST)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError" || err.name === "CastError" || err.type === "entity.parse.failed") statusCode = 400;
  if (err.code === 11000) { statusCode = 409; message = "A record with this value already exists."; }
  if (err.type === "entity.too.large") { statusCode = 413; message = "Request body is too large."; }
  if (statusCode >= 500) {
    console.error("Server Error:", err);
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export default app;
