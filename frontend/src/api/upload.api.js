/**
 * upload.api.js
 * Handles file uploads, validation & progress tracking
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/* ================================
   SUPPORTED FORMATS
================================ */

export const SUPPORTED_IMAGE_FORMATS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "eps",
  "svg",
];

export const SUPPORTED_VIDEO_FORMATS = [
  "mp4",
  "mov",
  "avi",
  "webm",
];

/* ================================
   FILE VALIDATION
================================ */

export function validateFiles(files) {
  const validFiles = [];
  const errors = [];

  Array.from(files).forEach((file) => {
    const ext = file.name.split(".").pop().toLowerCase();

    const isImage = SUPPORTED_IMAGE_FORMATS.includes(ext);
    const isVideo = SUPPORTED_VIDEO_FORMATS.includes(ext);

    if (!isImage && !isVideo) {
      errors.push(
        `${file.name} is not supported. Allowed: images & videos only`
      );
      return;
    }

    validFiles.push({
      file,
      type: isImage ? "image" : "video",
      extension: ext,
      size: file.size,
    });
  });

  return { validFiles, errors };
}

/* ================================
   UPLOAD FILES
================================ */

export function uploadFiles({ files, apiKey, onProgress }) {
  const formData = new FormData();

  files.forEach(({ file }) => {
    formData.append("files", file);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_BASE_URL}/upload`);

    xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === "function") {
        const percent = Math.round(
          (event.loaded / event.total) * 100
        );
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve({});
        }
      } else {
        reject(
          new Error(
            JSON.parse(xhr.responseText)?.message ||
              "Upload failed"
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during upload"));
    };

    xhr.send(formData);
  });
}

/* ================================
   MOCK UPLOAD (DEV MODE)
================================ */

export function mockUpload(files, onProgress) {
  return new Promise((resolve) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      if (typeof onProgress === "function") {
        onProgress(progress);
      }

      if (progress >= 100) {
        clearInterval(interval);
        resolve({
          uploadId: "mock_upload_456",
          files: files.map((f) => ({
            filename: f.file.name,
            status: "uploaded",
          })),
        });
      }
    }, 150);
  });
}

