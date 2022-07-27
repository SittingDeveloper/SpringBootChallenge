import React from 'react';
import './style.css'

import {} from "react-bootstrap";

function practice() {

    return (
        <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Bootstrap Slider</h3>
                </div>
                <ul className="lisst-unstyled components">
                    <p>Menu List</p>
                    <li className="active">
                        <a href="#foodSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Food
                            Menu</a>
                        <ul className="collapse lisst-unstyled" id="foodSubmenu">
                            <li><a href="#">All Menu</a></li>
                            <li><a href="#">Food</a></li>
                            <li><a href="#">Drink</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">History</a>
                    </li>
                    <li>
                        <a href="#">Add</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default practice;