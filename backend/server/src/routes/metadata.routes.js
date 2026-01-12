import express from "express";
import {
  generateMetadataController,
} from "../controllers/metadata.controller.js";

const router = express.Router();

router.post("/generate", generateMetadataController);

export default router;

