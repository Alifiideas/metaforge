import { useState } from "react";
import "./Tooltip.css";

function Tooltip({ text, children, position = "top" }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span className={`tooltip-bubble ${position}`}>
          {text}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
