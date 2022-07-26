import React, {useState} from 'react';
import './Sidebar.css';
import {RiMenuLine} from "react-icons/ri";
import {FaSchool} from "react-icons/fa";
import {IoIosBusiness, IoIosPin} from "react-icons/io";


function Sidebar() {

    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

    const handleToggler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed', true);
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
    }

    return (
        <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>

            <div className="sidebar-header">
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
                    <FaSchool className="sidebar-icon"/>
                    <span className="sidebar-text">
                        학교자료
                    </span>
                </div>

                <div className="item">
                    <IoIosPin className="sidebar-icon"/>
                    <span className="sidebar-text">
                        지역일반
                    </span>
                </div>

                <div className="item">
                    <IoIosBusiness className="sidebar-icon"/>
                    <span className="sidebar-text">
                        지역인프라
                    </span>
                </div>

            </div>


        </div>
    );
}

export default Sidebar;