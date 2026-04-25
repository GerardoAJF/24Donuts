import React from 'react';
import './BaseWindowCard.css';
import logo from '../../../assets/logo.svg';

const BaseWindowCard = ({ title, subtitle, children }) => {
  return (
    <div className="base-window-card">
      <div className="base-window-logo-container">
        <img src={logo} alt="24 Donuts Logo" className="base-window-logo" />
      </div>

     
      <div className="base-window-header">
        <h2 className="base-window-title">{title}</h2>
        {subtitle && <p className="base-window-subtitle">{subtitle}</p>}
        <hr className="base-window-divider" />
      </div>

  
      <div className="base-window-content">
        {children}
      </div>
    </div>
  );
};

export default BaseWindowCard;