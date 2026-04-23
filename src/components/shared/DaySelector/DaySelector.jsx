import React from 'react';
import './daySelector.css';

const DaySelector = () => {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="daySelector-component">
      <h3 className="daySelector-title">Días Laborales:</h3>
      <div className="daySelector-container">
        {days.map((day, index) => (
          <button key={index} className="day-circle">
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;