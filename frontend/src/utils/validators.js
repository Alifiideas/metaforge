/* =========================================================
   VALIDATORS — META FORGE
   ========================================================= */

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const VIDEO_TYPES = ["video/mp4"];

const MAX_FILE_SIZE_MB = 50;

/**
 * Validate uploaded files
 * @param {FileList | File[]} files
 */
export function validateFiles(files) {
  const validFiles = [];
  const errors = [];

  Array.from(files).forEach((file) => {
    const isValidType =
      IMAGE_TYPES.includes(file.type) ||
      VIDEO_TYPES.includes(file.type);

    if (!isValidType) {
      errors.push(`${file.name}: Unsupported file type`);
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      errors.push(
        `${file.name}: Exceeds ${MAX_FILE_SIZE_MB}MB limit`
      );
      return;
    }

    validFiles.push({
      file,
      type: file.type.startsWith("image")
        ? "image"
        : "video",
      sizeMB: Number(sizeMB.toFixed(2)),
    });
  });

  return { validFiles, errors };
}

/**
 * Simple API key validation (frontend only)
 */
export function isValidApiKey(key) {
  return typeof key === "string" && key.length >= 20;
}
