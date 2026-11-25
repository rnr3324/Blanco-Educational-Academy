const COOKIE_NAME = "blanco_admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60 * 1000;

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.COOKIE_SAME_SITE || (process.env.NODE_ENV === "production" ? "none" : "lax")).toLowerCase(),
  path: "/",
  maxAge: SESSION_MAX_AGE,
});

export const setAdminCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, cookieOptions());
};

export const clearAdminCookie = (res) => {
  const options = cookieOptions();
  delete options.maxAge;
  res.clearCookie(COOKIE_NAME, options);
};

export const getAdminCookie = (req) => {
  const cookieHeader = req.headers.cookie || "";
  const value = cookieHeader.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (!value) return null;
  try { return decodeURIComponent(value); } catch { return null; }
};

export const adminSessionMaxAge = SESSION_MAX_AGE;
