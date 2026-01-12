import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import metadataRoutes from "./routes/metadata.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

/* ======================================================
   GLOBAL APP CONFIG
====================================================== */

// Trust proxy (important for rate limiting & deployments)
app.set("trust proxy", 1);

/* ======================================================
   MIDDLEWARE
====================================================== */

// Body parsing
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // restrict in production
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// HTTP request logging
app.use(morgan("dev"));

// Global rate limiter (safety net)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // max requests per IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ======================================================
   ROUTES
====================================================== */

// Root route (✅ FIXES "Route not found" on /)
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Metaforge API",
    status: "running",
    env: process.env.NODE_ENV,
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Metaforge API",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/metadata", metadataRoutes);
app.use("/api/upload", uploadRoutes);

/* ======================================================
   ERROR HANDLING
====================================================== */

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 API Error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

export default app;

