import React from 'react';
import './Slider.css';

const Slider = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  unit = '', 
  formatValue 
}) => {
  // Calculate percentage for visual positioning
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Format the display value
  const displayValue = formatValue ? formatValue(value) : value;
  
  return (
    <div className="slider-container">
      <div className="slider-label">
        <span className="slider-label-text">{label}:</span>
        <span className="slider-value">
          {unit && unit === '$' && unit}
          {displayValue}
          {unit && unit !== '$' && ` ${unit}`}
        </span>
      </div>
      <div className="slider-track-container">
        <input
          type="range"
          className="slider-input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #d4a574 0%, #d4a574 ${percentage}%, #e8e8d5 ${percentage}%, #e8e8d5 100%)`
          }}
        />
        <div className="slider-ascii-track">
          <span className="track-start">[</span>
          <span className="track-line">{'─'.repeat(20)}</span>
          <span className="track-end">]</span>
          <span 
            className="track-indicator" 
            style={{ left: `calc(${percentage}% - 4px)` }}
          >
            ●
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slider;