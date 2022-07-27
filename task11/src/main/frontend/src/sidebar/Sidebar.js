import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <br/>
                <img className="logo_icon" alt="logo" src="img/logo.png" width="180"/>
                <a href="#">지역자원 정보시스템</a>
            </div>

            <ul className="list-unstyled">

                <li>
                    <a href="#schoolSubmenu" data-toggle="collapse" aria-expanded="false"
                       className="dropdown-toggle collapsed">
                        <span className="icon"><i className="fa-solid fa-school"></i></span>
                        학교자료
                    </a>

                    <ul className="collapse list-unstyled" id="schoolSubmenu">
                        <li><a href="#">schoolSub 1</a></li>
                        <li><a href="#">schoolSub 2</a></li>
                        <li><a href="#">schoolSub 3</a></li>
                    </ul>
                </li>

                <li>
                    <a href="#localSubmenu" data-toggle="collapse" aria-expanded="false"
                       className="dropdown-toggle collapsed">
                        <span className="icon"><i className="fa-solid fa-location-dot"></i></span>지역일반</a>

                    <ul className="collapse list-unstyled" id="localSubmenu">
                        <li><a href="#">localSub 1</a></li>
                        <li><a href="#">localSub 2</a></li>
                        <li><a href="#">localSub 3</a></li>
                    </ul>
                </li>

                <li>
                    <a href="#infraSubmenu" data-toggle="collapse" aria-expanded="false"
                       className="dropdown-toggle collapsed">
                        <span className="icon"><i className="fa-solid fa-building"></i></span>지역인프라</a>

                    <ul className="collapse list-unstyled" id="infraSubmenu">
                        <li><a href="#">infraSub 1</a></li>
                        <li><a href="#">infraSub 2</a></li>
                        <li><a href="#">infraSub 3</a></li>
                    </ul>
                </li>

                <li>
                    <a href="#"><span className="icon"><i className="fas fa-mobile-alt"></i></span>Other</a>
                </li>

            </ul>
        </nav>
    );
}

export default Sidebar;