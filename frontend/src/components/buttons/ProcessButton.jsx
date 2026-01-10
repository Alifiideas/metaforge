import Loader from "../common/Loader";
import "./ProcessButton.css";

function ProcessButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Process",
}) {
  return (
    <button
      className={`process-btn ${loading ? "loading" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loader size={18} text="Processing" />
      ) : (
        label
      )}
    </button>
  );
}

export default ProcessButton;

