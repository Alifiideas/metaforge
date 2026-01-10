import "./ToggleSwitch.css";

function ToggleSwitch({
  label,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <div className={`toggle-switch ${disabled ? "disabled" : ""}`}>
      {label && <span className="toggle-label">{label}</span>}

      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="slider" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
