// TabBar.jsx
import React from "react";
import "./TabBar.css";

const TabBar = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="tab-bar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-bar__item ${activeTab === tab.id ? "tab-bar__item--active" : ""}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabBar;