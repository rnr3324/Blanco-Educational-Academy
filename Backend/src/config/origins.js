const developmentOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

export const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || "").split(",").map((origin) => origin.trim()).filter(Boolean),
  ...(process.env.NODE_ENV === "production" ? [] : developmentOrigins),
].filter(Boolean);
