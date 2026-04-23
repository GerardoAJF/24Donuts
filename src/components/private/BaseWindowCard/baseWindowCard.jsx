import React from 'react';
import './baseWindowCard.css';

const BaseWindowCard = ({ title, subtitle, children }) => {
  return (
    <div className="baseWindow-card">
      <div className="baseWindow-logo-container">
        <div className="baseWindow-logo">
          <span className="logo-text">24</span>
          <span className="logo-main">DONUTS</span>
          <div className="logo-house">24</div>
        </div>
      </div>
      {title && <h2 className="baseWindow-title">{title}</h2>}
      {subtitle && <p className="baseWindow-subtitle">{subtitle}</p>}
      <div className="baseWindow-content">
        {children}
      </div>
    </div>
  );
};

export default BaseWindowCard;