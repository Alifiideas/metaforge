import { useEffect, useState } from "react";
import "./FilePreview.css";

function FilePreview({
  files = [],
  onRemoveFiles,
  onClearAll,
}) {
  const [previews, setPreviews] = useState([]);
  const [selected, setSelected] = useState(new Set());

  /* ================= MAP FILES ================= */

  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      setSelected(new Set());
      return;
    }

    const mapped = files.map((file, index) => {
      const type = getFileType(file);

      let src = null;
      if (file instanceof File) {
        src = URL.createObjectURL(file);
      } else if (file.path || file.url) {
        src = file.path || file.url;
      }

      return {
        id: file.id || file.filename || file.name || index,
        name: file.name || file.originalName || file.filename,
        size: file.size,
        type,
        src,
      };
    });

    setPreviews(mapped);

    return () => {
      mapped.forEach((p) => {
        if (p.src?.startsWith("blob:")) {
          URL.revokeObjectURL(p.src);
        }
      });
    };
  }, [files]);

  if (!previews.length) return null;

  /* ================= SELECTION ================= */

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeSelected = () => {
    onRemoveFiles?.(Array.from(selected));
    setSelected(new Set());
  };

  /* ================= UI ================= */

  return (
    <div className="file-preview">
      <div className="preview-header">
        <h4>Uploaded Files ({previews.length})</h4>

        <div className="preview-actions">
          {selected.size > 0 && (
            <button
              className="btn danger"
              onClick={removeSelected}
            >
              🗑 Remove ({selected.size})
            </button>
          )}

          <button
            className="btn ghost"
            onClick={onClearAll}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="file-grid">
        {previews.map((file) => (
          <div
            key={file.id}
            className={`file-card ${
              selected.has(file.id) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(file.id)}
          >
            {/* CHECKBOX */}
            <div className="file-check">
              <input
                type="checkbox"
                checked={selected.has(file.id)}
                readOnly
              />
            </div>

            {/* PREVIEW */}
            <div className="file-thumb">
              {file.type === "image" && file.src && (
                <img src={file.src} alt={file.name} />
              )}

              {file.type === "video" && file.src && (
                <video src={file.src} />
              )}

              {file.type === "file" && (
                <div className="file-icon">FILE</div>
              )}
            </div>

            {/* INFO */}
            <div className="file-info">
              <span className="file-name" title={file.name}>
                {file.name}
              </span>
              <span className="file-size">
                {formatSize(file.size)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

const getFileType = (file) => {
  if (file?.type?.startsWith("image/")) return "image";
  if (file?.type?.startsWith("video/")) return "video";
  return "file";
};

const formatSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export default FilePreview;


