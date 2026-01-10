import { motion } from "framer-motion";
import "./RangeSlider.css";

function RangeSlider({
  label,
  min,
  max,
  value,
  unit = "words",
  disabled = false,
  onChange
}) {
  return (
    <div className={`range-slider ${disabled ? "disabled" : ""}`}>
      {/* HEADER */}
      <div className="range-header">
        <span className="range-label">{label}</span>
        <span className="range-value">
          {value} {unit}
        </span>
      </div>

      {/* SLIDER */}
      <motion.input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      />

      {/* FOOTER */}
      <div className="range-footer">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {/* LOCK OVERLAY */}
      {disabled && (
        <div className="range-lock">
          🔒 Upgrade to unlock
        </div>
      )}
    </div>
  );
}

export default RangeSlider;
