import React, {useState} from 'react';
import './Sidebar.css';
import {RiMenuLine, RiLayoutGridFill, RiChat4Fill, RiTeamFill, RiTaskFill, RiPieChart2Fill} from "react-icons/ri";

function Sidebar() {

    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

    const handleToggler = () => {
        if(isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed', true);
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
    }

    return (
        <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>

            <div className= "sidebar-header">
                <img className="logo_icon" alt="logo" src="img/logo.png"/>
            </div>

            <div className="sidebar-text">
                <figcaption>
                    지역자원 정보시스템
                </figcaption>
            </div>

            <div className="sidebar-header">
                <RiMenuLine className="sidebar-hidden" onClick={handleToggler}/>
                {/*<h1 className="sidebar-logo">LOGO</h1>*/}
            </div>

            { /* Sidebar Items List */}
            <div className="sidebar-items">

                <div className="item">
                    <RiLayoutGridFill className="sidebar-icon"/>
                    <span className="sidebar-text">Dashboard</span>
                </div>

                <div className="item">
                    <RiChat4Fill className="sidebar-icon"/>
                    <span className="sidebar-text">Chat</span>
                </div>

                <div className="item">
                    <RiTeamFill className="sidebar-icon"/>
                    <span className="sidebar-text">Teams</span>
                </div>

                <div className="item">
                    <RiTaskFill className="sidebar-icon"/>
                    <span className="sidebar-text">Tasks</span>
                </div>

                <div className="item">
                    <RiPieChart2Fill className="sidebar-icon"/>
                    <span className="sidebar-text">Analytics</span>
                </div>

            </div>


        </div>
    );
}

export default Sidebar;