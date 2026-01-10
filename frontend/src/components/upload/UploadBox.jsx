import "./UploadBox.css";

function UploadBox({
  title = "Upload Files",
  formats = "JPG · PNG · SVG · EPS · MP4",
  multiple = true,
  onUpload,
  progress = 0,
}) {
  return (
    <div className="upload-box">
      <h2>{title}</h2>
      <p className="formats">{formats}</p>

      <label className="upload-area">
        <input
          type="file"
          multiple={multiple}
          onChange={onUpload}
          hidden
        />
        <div className="upload-inner">
          <span className="upload-icon">⬆</span>
          <span className="upload-text">Choose Files</span>
          <small>Drag & drop or click to upload</small>
        </div>
      </label>

      {progress > 0 && (
        <div className="upload-progress">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          />
          <span>{progress}%</span>
        </div>
      )}

      <small className="upload-note">
        Unlimited metadata • CSV export • Secure processing
      </small>
    </div>
  );
}

export default UploadBox;
