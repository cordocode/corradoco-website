import React, { useEffect, useRef } from 'react';
import './slider.css';

const Slider = ({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  width = '100px',
  displayValue,
  suffix = ''
}) => {
  const sliderRef = useRef(null);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty('--percent', `${percentage}%`);
    }
  }, [percentage]);
  
  const showValue = displayValue !== undefined ? displayValue : value;
  
  return (
    <>
      <span className="inline-slider-container" style={{ width }}>
        <input
          ref={sliderRef}
          type="range"
          className="inline-slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </span>
      <span className="slider-display-value">{showValue}</span>
      {suffix && <span className="slider-suffix">{suffix}</span>}
    </>
  );
};

export default Slider;