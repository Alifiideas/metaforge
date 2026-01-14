import express from "express";
import multer from "multer";
import { uploadController } from "../controllers/upload.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ✅ MEMORY STORAGE */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

/**
 * POST /api/upload
 */
router.post(
  "/upload",
  authMiddleware,
  upload.array("files"),
  uploadController
);

export default router;

