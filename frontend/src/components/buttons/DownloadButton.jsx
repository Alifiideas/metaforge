import "./DownloadButton.css";

function DownloadButton({
  onClick,
  disabled = false,
  label = "Download CSV",
  format = "CSV",
}) {
  return (
    <button
      className="download-btn"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Generate metadata first" : `Download ${format}`}
    >
      ⬇️ {label}
    </button>
  );
}

export default DownloadButton;
