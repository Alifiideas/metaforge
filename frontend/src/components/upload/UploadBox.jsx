import { useRef, useState } from "react";
import "./UploadBox.css";

function UploadBox({
  onFilesSelected,
  onUpload,
  progress = 0,
  uploading = false,
  formats,
}) {
  const inputRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(0);

  /* ================= FILE SELECT ================= */

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedCount(files.length);
    onFilesSelected(files);

    // allow re-selecting same files
    e.target.value = null;
  };

  /* ================= DRAG & DROP ================= */

  const handleDrop = (e) => {
    e.preventDefault();
    if (uploading) return;

    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;

    setSelectedCount(files.length);
    onFilesSelected(files);
  };

  return (
    <div className="upload-box">
      <h2>Upload Files</h2>
      <div className="formats">{formats}</div>

      {/* DROP AREA */}
      <label
        className={`upload-area ${uploading ? "disabled" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          disabled={uploading}
          onChange={handleChange}
        />

        <div className="upload-inner">
          <span className="upload-icon">📤</span>
          <span className="upload-text">
            Click or drag files here
          </span>

          {selectedCount > 0 && (
            <span className="upload-count">
              {selectedCount} file
              {selectedCount > 1 ? "s" : ""} selected
            </span>
          )}
        </div>
      </label>

      {/* UPLOAD BUTTON */}
      <button
        className="upload-btn"
        onClick={onUpload}
        disabled={uploading || selectedCount === 0}
      >
        {uploading ? "Uploading…" : "Upload Files"}
      </button>

      {/* PROGRESS */}
      {progress > 0 && (
        <div className="upload-progress">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
          <span>{progress}%</span>
        </div>
      )}

      {uploading && (
        <small className="upload-note">
          ⏳ Uploading files…
        </small>
      )}
    </div>
  );
}

export default UploadBox;

