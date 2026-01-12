import path from "path";
import fs from "fs";
import crypto from "crypto";

/* ================= CONFIG ================= */

const UPLOAD_DIR = path.resolve("uploads");

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "application/postscript", // EPS
  "video/mp4",
];

const MAX_FILE_SIZE_MB = 50;

/* ================= HELPERS ================= */

const ensureUploadDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
};

const generateSafeFileName = (originalName) => {
  const ext = path.extname(originalName);
  const hash = crypto.randomBytes(12).toString("hex");
  return `${hash}${ext}`;
};

/* ================= CONTROLLER ================= */

/**
 * POST /api/upload
 */
export const uploadController = async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    ensureUploadDir();

    const uploadedFiles = [];

    for (const file of req.files) {
      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return res.status(415).json({
          success: false,
          message: `Unsupported file type: ${file.originalname}`,
        });
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        return res.status(413).json({
          success: false,
          message: `File too large: ${file.originalname}`,
        });
      }

      const safeName = generateSafeFileName(file.originalname);
      const targetPath = path.join(UPLOAD_DIR, safeName);

      fs.writeFileSync(targetPath, file.buffer);

      uploadedFiles.push({
        id: safeName,
        originalName: file.originalname,
        filename: safeName,
        size: file.size,
        mime: file.mimetype,
        path: `/uploads/${safeName}`,
      });
    }

    return res.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
};
