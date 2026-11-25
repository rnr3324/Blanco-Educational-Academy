import { createHash } from "node:crypto";

const cloudName = () => process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = () => process.env.CLOUDINARY_API_KEY;
const apiSecret = () => process.env.CLOUDINARY_API_SECRET;
const isConfigured = () => Boolean(cloudName() && apiKey() && apiSecret());

const signature = (parameters) => {
  const canonical = Object.entries(parameters)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return createHash("sha1").update(`${canonical}${apiSecret()}`).digest("hex");
};

export const uploadImage = async (dataUrl) => {
  const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || "");
  if (!match) {
    const error = new Error("Choose a PNG, JPG, WEBP, or GIF image.");
    error.statusCode = 400;
    throw error;
  }
  const [, mimeType, encoded] = match;
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.length > 4 * 1024 * 1024) {
    const error = new Error("Image must be 4 MB or smaller.");
    error.statusCode = 413;
    throw error;
  }

  if (!isConfigured()) {
    if (process.env.NODE_ENV === "production") {
      const error = new Error("Image storage is not configured. Contact the site administrator.");
      error.statusCode = 503;
      throw error;
    }
    return { image: dataUrl, imagePublicId: "" };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "blanco-educational-academy";
  const params = { folder, timestamp };
  const form = new FormData();
  form.append("file", new Blob([bytes], { type: mimeType }), `academy-image.${mimeType.split("/")[1]}`);
  form.append("api_key", apiKey());
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature(params));

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName()}/image/upload`, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(20_000),
  });
  const result = await response.json();
  if (!response.ok || !result.secure_url || !result.public_id) {
    console.error("Cloudinary image upload failed:", result.error?.message || response.statusText);
    const error = new Error("Image upload failed. Please try again.");
    error.statusCode = 502;
    throw error;
  }
  return { image: result.secure_url, imagePublicId: result.public_id };
};

export const deleteStoredImage = async (publicId) => {
  if (!publicId || !isConfigured()) return;
  const timestamp = Math.floor(Date.now() / 1000);
  const params = { public_id: publicId, timestamp };
  const form = new FormData();
  form.append("public_id", publicId);
  form.append("api_key", apiKey());
  form.append("timestamp", String(timestamp));
  form.append("signature", signature(params));

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName()}/image/destroy`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(20_000),
    });
    const result = await response.json();
    if (!response.ok || !["ok", "not found"].includes(result.result)) {
      console.error("Cloudinary image deletion failed:", result.error?.message || response.statusText);
    }
  } catch (error) {
    console.error("Cloudinary image deletion failed:", error.message);
  }
};
