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
  const percentage =
    ((value - min) / (max - min)) * 100;

  return (
    <div className="range-slider">
      {/* HEADER */}
      <div className="range-header">
        <span className="range-label">{label}</span>

        <motion.span
          className="range-value"
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {value} <small>{unit}</small>
        </motion.span>
      </div>

      {/* SLIDER TRACK */}
      <div className="range-track">
        <div
          className="range-fill"
          style={{ width: `${percentage}%` }}
        />

        <motion.input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        />
      </div>

      {/* FOOTER */}
      <div className="range-footer">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default RangeSlider;

