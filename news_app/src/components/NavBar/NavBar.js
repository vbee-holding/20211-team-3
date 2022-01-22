import React, { useState } from "react";

const NavBar = (props) => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><a href="" title="news">NEWS</a><a href="" title=""></a></li>
                    <li><a href="" title="opinion">OPINION</a><a href="" title=""></a></li>
                    <li><a href="" title="life">LIFE</a><a href="" title=""></a></li>
                    <li><a href="" title="community">COMMUNITY</a><a href="" title=""></a></li>
                    <li><a href="" title="culture">CULTURE</a><a href="" title=""></a></li>
                    <li><a href="" title="sport">SPORT</a><a href="" title=""></a></li>
                    <a href="" title=""><i className="fa fa-search"></i></a>
                </ul>
            </nav>
            <nav className="subnav">
                <ul>
                    <li><a href="" title="">NATIONAL</a><a href="" title=""></a></li>
                    <li><a href="" title="">asia pasific</a><a href="" title=""></a></li>
                    <li><a href="" title="">business</a><a href="" title=""></a></li>
                    <li><a href="" title="">world</a><a href="" title=""></a></li>
                    <li><a href="" title="">reference</a><a href="" title=""></a></li>
                    <li><a href="" title="">multimedia</a><a href="" title=""></a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar