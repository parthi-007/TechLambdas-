import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import '../layout/layout.css'; 

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main-section">
                <Navbar />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
