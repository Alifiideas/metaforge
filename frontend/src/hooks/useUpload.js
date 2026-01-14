import { useState } from "react";
import axios from "axios";

/**
 * useUpload
 * Handles file selection, upload, progress, errors & file removal
 */
export default function useUpload() {
  const [files, setFiles] = useState([]); // [{ id, file }]
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  /* ================= FILE SELECTION ================= */

  const selectFiles = (selectedFiles = []) => {
    if (!selectedFiles.length) return;

    const withIds = selectedFiles.map((file, index) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
      file,
    }));

    setFiles(withIds);
    setUploaded(false);
    setProgress(0);
    setError(null);
    setMessage(null);
  };

  /* ================= UPLOAD ================= */

  const upload = async () => {
    if (!files.length) {
      setError("No files selected");
      return false;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();

      files.forEach(({ file }) => {
        formData.append("files", file);
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY, // ✅ REQUIRED
          },
          onUploadProgress: (e) => {
            if (!e.total) return;
            setProgress(
              Math.round((e.loaded * 100) / e.total)
            );
          },
        }
      );

      setUploaded(true);
      setMessage("✅ Files uploaded successfully");
      return true;
    } catch (err) {
      console.error("Upload error:", err);

      setError(
        err.response?.data?.message ||
          "❌ Upload failed. Please try again."
      );

      setUploaded(false);
      return false;
    } finally {
      setUploading(false);
    }
  };

  /* ================= FILE MANAGEMENT ================= */

  const removeFiles = (ids = []) => {
    if (!ids.length) return;

    setFiles((prev) =>
      prev.filter((f) => !ids.includes(f.id))
    );

    setUploaded(false);
    setMessage(null);
  };

  const clearFiles = () => {
    setFiles([]);
    setProgress(0);
    setUploaded(false);
    setError(null);
    setMessage(null);
  };

  /* ================= EXPORT ================= */

  return {
    // data
    files: files.map((f) => f.file), // FilePreview expects File[]
    progress,
    uploading,
    uploaded,
    error,
    message,

    // actions
    selectFiles,
    upload,
    removeFiles,
    clearFiles,
  };
}
