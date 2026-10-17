import cors from "cors";
import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import Redis from "ioredis";
import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import appointmentRouter from "./routes/appointmentRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import serviceRouter from "./routes/serviceRoutes.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRouter.js";
import stripeWebhookRouter from "./routes/stripeWebhookRouter.js";

process.on("unhandledRejection", (reason) => {
  console.error(
    "UNHANDLED PROMISE REJECTION — this should be fixed at the source:",
    reason,
  );
});
process.on("uncaughtException", (err) => {
  console.error(
    "UNCAUGHT EXCEPTION — process will exit for a clean restart:",
    err,
  );
  setTimeout(() => process.exit(1), 500);
});

const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

const envOrigins = [
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  ...(process.env.ADMIN_FRONTEND_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
];
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...envOrigins,
];
if (envOrigins.length === 0) {
  console.warn(
    "CORS: FRONTEND_URL / ADMIN_FRONTEND_URL are not set — only localhost dev origins are allowed. Set these before deploying, or all real-domain requests will be rejected by CORS.",
  );
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(clerkMiddleware());

app.use("/api/webhooks/stripe", stripeWebhookRouter);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use((req, res, next) => {
  function sanitize(obj) {
    if (!obj || typeof obj !== "object") return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$")) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        sanitize(obj[key]);
      }
    }
    return obj;
  }
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
});

app.use((req, res, next) => {
  const password = req.body?.password;
  if (password && typeof password === "string" && password.length > 128) {
    return res.status(400).json({
      success: false,
      message: "Password must not exceed 128 characters",
    });
  }
  next();
});

let redisClient = null;
if (process.env.REDIS_URL) {
  try {
    redisClient = new Redis(process.env.REDIS_URL, { lazyConnect: true });
    redisClient.on("error", (err) =>
      console.error("Redis rate-limit store error:", err.message),
    );
    console.log("Rate limiting backed by Redis (shared across instances).");
  } catch (err) {
    console.error(
      "Failed to initialize Redis client, falling back to in-memory rate limiting:",
      err.message,
    );
    redisClient = null;
  }
} else {
  console.warn(
    "REDIS_URL is not set — rate limits are tracked in-memory per process. " +
      "Fine for a single instance; if this API is ever horizontally scaled, set REDIS_URL so limits are enforced correctly across all instances.",
  );
}

function makeRateLimitStore(prefix) {
  if (!redisClient) return undefined;
  return new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix,
  });
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeRateLimitStore("rl:login:"),
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeRateLimitStore("rl:booking:"),
  message: {
    success: false,
    message: "Too many booking attempts. Try again later.",
  },
});
const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  store: makeRateLimitStore("rl:general:"),
});

connectDB();

app.use("/api", generalApiLimiter);
app.use("/api/doctors/login", loginLimiter);
app.use("/api/doctors/forgot-password", loginLimiter);
app.use("/api/appointments", (req, res, next) =>
  req.method === "POST" ? bookingLimiter(req, res, next) : next(),
);
app.use("/api/service-appointments", (req, res, next) =>
  req.method === "POST" ? bookingLimiter(req, res, next) : next(),
);

app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/service-appointments", serviceAppointmentRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use((err, req, res, next) => {
  console.error("Unhandled request error:", err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
