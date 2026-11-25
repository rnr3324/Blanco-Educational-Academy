const buckets = new Map();
let cleanupAt = Date.now() + 60_000;

const rateLimiter = ({ windowMs = 15 * 60_000, max = 100, message = "Too many requests. Try again later.", scope = "default" } = {}) =>
  (req, res, next) => {
    const now = Date.now();
    const key = `${scope}:${req.ip || req.socket.remoteAddress}`;
    let bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(0, max - bucket.count));
    res.setHeader("RateLimit-Reset", Math.ceil(bucket.resetAt / 1000));

    if (bucket.count > max) {
      res.setHeader("Retry-After", Math.ceil((bucket.resetAt - now) / 1000));
      return res.status(429).json({ success: false, message });
    }

    if (now >= cleanupAt) {
      for (const [bucketKey, entry] of buckets) {
        if (entry.resetAt <= now) buckets.delete(bucketKey);
      }
      cleanupAt = now + 60_000;
    }

    next();
  };

export const apiLimiter = rateLimiter({ max: 300, scope: "api", message: "Too many requests. Please wait before trying again." });
export const authLimiter = rateLimiter({ max: 8, scope: "auth", message: "Too many sign-in attempts. Try again in 15 minutes." });
export const formLimiter = rateLimiter({ max: 12, scope: "forms", message: "Too many submissions. Please try again later." });
export const uploadLimiter = rateLimiter({ max: 40, scope: "uploads", message: "Too many image uploads. Please try again later." });
