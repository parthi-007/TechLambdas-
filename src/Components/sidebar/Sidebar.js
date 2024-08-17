// Sidebar.js
import React from 'react';
import '../sidebar/sidebar.css'; // Add your styles here

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-title">
                TechLambdas
            </div>
            <div className="sidebar-bottom">
                <button className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
