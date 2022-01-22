import React, { useState } from "react";

import mainIcon from '../../assets/img/all-icons_02.png'
import logo from '../../assets/img/bm-logo.png'

const Header = (props) => {
    return (
        <header className="header">
            <div className="header_left">
                <div className="header_left_social">
                    <ul>
                        <li><a href="" title="twitter"><i className="fa fa-twitter"></i></a><a href="" title=""></a><a href="" title=""></a></li>
                        <li><a href="" title="facebook"><i className="fa fa-facebook-f"></i></a><a href="" title=""></a><a href="" title=""></a></li>
                        <li><a href="" title="rss"><i className="fa fa-rss"></i></a><a href="" title=""></a><a href="" title=""></a></li>
                    </ul>
                </div>
                <div className="header_left_weather">
                    <a href="" title="weather_today">
                        <img src={mainIcon} className="weather_img" alt="weather-today" />
                    </a>
                    <div className="weather">
                        <p>8*C M/SUNNY</p>
                        <h3>TOKYO (5 p . m. )</h3>
                    </div>
                </div>
                <a href="" className="header_left_print_edition" title="TODAY'S PRINT EDITION">TODAY'S PRINT EDITION</a>
            </div>
            <div className="header_middle">
                <a href="" title="Bao moi" ><img src={logo} alt="bm_logo" /></a>
            </div>
            <div className="header_right">
                <a href="" title="Subscribe" className="header_right_subscribe">SUBSCRIBE</a>
                <a href="" title="Login" className="header_right_login"><i className="fa fa-user"></i>LOGIN</a>
            </div>
        </header>
    )
}

export default Header