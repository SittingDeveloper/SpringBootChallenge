import React from 'react';
import './Sidebar.css';


function Sidebar() {

    return (
        // wrapper : 상관x
        <div className="wrapper">
            <ui className="mainMenu">
                <li className="item" id="account">
                    <a href="#account" className="btn"><i className="fas fa-user-circle"></i>My Account</a>
                    <div className="subMenu">
                        <a href="">item-1</a>
                        <a href="">item-2</a>
                        <a href="">item-3</a>
                    </div>
                </li>
                <li className="item" id="about">
                    <a href="#about" className="btn"><i className="fas fa-address-card"></i>About</a>
                    <div className="subMenu">
                        <a href="">item-1</a>
                        <a href="">item-2</a>
                    </div>
                </li>
                <li className="item" id="support">
                    <a href="#support" className="btn"><i className="fas fa-info"></i>Support</a>
                    <div className="subMenu">
                        <a href="">item-1</a>
                    </div>
                </li>
                <li className="item">
                    <a href="#" className="btn"><i className="fas fa-sign-out-alt"></i>Log Out</a>
                </li>
            </ui>
        </div>
    );
}

export default Sidebar;