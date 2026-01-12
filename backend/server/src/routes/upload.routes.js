import express from "express";
import { uploadController } from "../controllers/upload.controller.js";

const router = express.Router();

/**
 * POST /api/upload
 */
router.post("/", uploadController);

export default router;

