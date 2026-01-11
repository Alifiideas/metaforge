import { motion } from "framer-motion";
import "./RangeSlider.css";

function RangeSlider({
  label,
  min,
  max,
  value,
  unit = "words",
  onChange,
}) {
  return (
    <div className="range-slider">
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
        onChange={(e) => onChange(Number(e.target.value))}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />

      {/* FOOTER */}
      <div className="range-footer">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default RangeSlider;
