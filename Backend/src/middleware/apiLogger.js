import { randomUUID } from "node:crypto";
import ApiLog from "../models/ApiLog.js";

const apiLogger = (req, res, next) => {
  if (!req.originalUrl.startsWith("/api/") || req.originalUrl.startsWith("/api/admin/logs")) return next();

  const startedAt = Date.now();
  const requestId = randomUUID();
  res.setHeader("X-Request-Id", requestId);

  res.on("finish", () => {
    const [path] = req.originalUrl.split("?");
    ApiLog.create({
      requestId,
      method: req.method,
      path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip || "",
      origin: req.get("origin") || "",
      userAgent: (req.get("user-agent") || "").slice(0, 300),
      adminEmail: req.user?.role === "admin" ? req.user.email : "",
    }).catch((error) => console.error("Could not save API request log:", error.message));
  });

  next();
};

export default apiLogger;
