const validPort = (value) => Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) <= 65535;

const validateEnv = () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be configured");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be configured");
  if (!validPort(process.env.PORT || "5000")) throw new Error("PORT must be a valid TCP port");
  if (process.env.NODE_ENV && !["development", "test", "production"].includes(process.env.NODE_ENV)) {
    throw new Error("NODE_ENV must be development, test, or production");
  }

  const sameSite = (process.env.COOKIE_SAME_SITE || (process.env.NODE_ENV === "production" ? "none" : "lax")).toLowerCase();
  if (!["lax", "strict", "none"].includes(sameSite)) {
    throw new Error("COOKIE_SAME_SITE must be lax, strict, or none");
  }

  if (process.env.NODE_ENV === "production") {
    if (process.env.JWT_SECRET.length < 32) throw new Error("Production JWT_SECRET must be at least 32 characters");
    if (!process.env.CLIENT_URL?.startsWith("https://")) throw new Error("Production CLIENT_URL must use HTTPS");
    const secondaryOrigins = (process.env.CLIENT_URLS || "").split(",").map((origin) => origin.trim()).filter(Boolean);
    if (secondaryOrigins.some((origin) => !origin.startsWith("https://"))) {
      throw new Error("Every production CLIENT_URLS origin must use HTTPS");
    }
    for (const key of ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"]) {
      if (!process.env[key]) throw new Error(`${key} is required in production for image uploads`);
    }
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!/^[a-z0-9-]+$/i.test(cloudName)) throw new Error("CLOUDINARY_CLOUD_NAME has an invalid format");
    const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
    if (nodeMajor < 20 || (nodeMajor === 20 && nodeMinor < 19)) {
      throw new Error("Node.js 20.19 or newer is required in production");
    }
  }
};

export default validateEnv;
