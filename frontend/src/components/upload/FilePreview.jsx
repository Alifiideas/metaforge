import "./FilePreview.css";

function FilePreview({ files = [] }) {
  if (!files.length) return null;

  return (
    <div className="file-preview">
      <h4>Uploaded Files</h4>

      <div className="file-grid">
        {files.map((file, index) => {
          const type = getFileType(file);

          return (
            <div key={index} className="file-card">
              <div className={`file-icon ${type}`}>
                {type.toUpperCase()}
              </div>

              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {formatSize(file.size)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

const getFileType = (file) => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return "file";
};

const formatSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export default FilePreview;
