import React from "react";

const Legend = () => {
  return (
    <div className="legend" id="legend" style="display: none;">
      <div className="legend-item">
        <div className="legend-color done"></div>
        <span className="legend-label">Done</span>
      </div>
      <div className="legend-item">
        <div className="legend-color not-started"></div>
        <span className="legend-label">Not started</span>
      </div>
      <div className="legend-item">
        <div className="legend-color in-progress"></div>
        <span className="legend-label">In progress</span>
      </div>
    </div>
  );
};

export default Legend;
