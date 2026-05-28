import React, { useState } from 'react';
import './roleTabs.css';

const RoleTabs = ({ tabs = ['Administradores', 'Empleados', 'Clientes'] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="roleTabs-container">
      <div className="roleTabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`roleTabs-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleTabs;