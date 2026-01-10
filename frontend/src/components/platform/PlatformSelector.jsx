import "./PlatformSelector.css";

function PlatformSelector({ platforms, value, onChange }) {
  return (
    <div className="platform-selector">
      {platforms.map((platform) => (
        <button
          key={platform}
          className={`platform-btn ${
            value === platform ? "active" : ""
          }`}
          onClick={() => onChange(platform)}
          type="button"
        >
          {platform.replace("_", " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default PlatformSelector;
