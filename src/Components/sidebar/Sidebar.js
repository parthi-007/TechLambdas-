import React from 'react';
import '../sidebar/sidebar.css'; // Add your styles here
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const nav = useNavigate()
    const goToLogoIn =()=>{
        nav('/')
    }
    return (
        <div className="sidebar">
            <div className="sidebar-title">
            <span className="tech-lambdas-span" style={{color:'#0038FF'}}>Tech</span><span>Lambdas</span>
            </div>
            <div className="sidebar-bottom">
                <button className="logout-button" onClick={goToLogoIn}>Log Out</button>
            </div>
        </div>
    );
}

export default Sidebar;
