import { getAuth } from "@clerk/express";

const rawAllowlist = process.env.ADMIN_CLERK_USER_IDS || "";
const ADMIN_USER_IDS = new Set(
  rawAllowlist
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

function resolveAdminAuth(req) {
  try {
    if (typeof req.auth === "function") return req.auth();
  } catch (e) {}
  if (req.auth && typeof req.auth === "object") return req.auth;
  try {
    return getAuth ? getAuth(req) : null;
  } catch (e) {
    return null;
  }
}

export default function adminAuth(req, res, next) {
  if (ADMIN_USER_IDS.size === 0) {
    console.warn(
      "ADMIN_CLERK_USER_IDS is not set — no one can access admin routes until it's configured.",
    );
    return res
      .status(500)
      .json({
        success: false,
        message: "Server misconfiguration: no admins configured",
      });
  }

  const auth = resolveAdminAuth(req) || {};
  const userId = auth?.userId || auth?.user_id || null;

  if (!userId) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Admin not authorized, sign-in required",
      });
  }
  if (!ADMIN_USER_IDS.has(userId)) {
    return res
      .status(403)
      .json({
        success: false,
        message: "This account is not authorized for admin access",
      });
  }

  req.adminUserId = userId;
  next();
}
