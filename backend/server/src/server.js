/* ======================================================
   ENV SETUP (MUST BE FIRST)
====================================================== */
import dotenv from "dotenv";
dotenv.config();

/* ======================================================
   IMPORTS
====================================================== */
import http from "http";
import app from "./app.js";

/* ======================================================
   CONFIG
====================================================== */
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

/* ======================================================
   SERVER
====================================================== */
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `🚀 Metaforge API running on port ${PORT} (${NODE_ENV})`
  );
});

/* ======================================================
   GRACEFUL SHUTDOWN
====================================================== */
const shutdown = (signal) => {
  console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

/* ======================================================
   PROCESS SAFETY
====================================================== */

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

// Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
  process.exit(1);
});

