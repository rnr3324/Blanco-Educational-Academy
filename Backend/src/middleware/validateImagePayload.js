import ErrorResponse from "../utils/errorResponse.js";

const validateImagePayload = (req, res, next) => {
  const { image, imagePublicId } = req.body || {};
  if (image !== undefined && typeof image !== "string") {
    return next(new ErrorResponse("Image must be a URL or uploaded image", 400));
  }
  if (image && image.length > 2048 && !image.startsWith("data:image/")) {
    return next(new ErrorResponse("Image URL is too long", 400));
  }
  if (process.env.NODE_ENV === "production" && image?.startsWith("data:image/")) {
    return next(new ErrorResponse("Images must be uploaded to the configured image storage service", 400));
  }
  if (image && !image.startsWith("data:image/")) {
    try {
      const parsed = new URL(image);
      const allowedProtocols = process.env.NODE_ENV === "production" ? ["https:"] : ["https:", "http:"];
      if (!allowedProtocols.includes(parsed.protocol)) throw new Error("invalid protocol");
    } catch {
      return next(new ErrorResponse("Enter a valid image URL", 400));
    }
  }
  if (imagePublicId !== undefined && (typeof imagePublicId !== "string" || imagePublicId.length > 255)) {
    return next(new ErrorResponse("Image storage identifier is invalid", 400));
  }
  next();
};

export default validateImagePayload;
