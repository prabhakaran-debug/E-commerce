import React from "react";
import { Link } from "react-router-dom";
import '../Components/Header.css';
function Header(){
        return(
            <div className="header-container">
                <div className="logo"><h3>E-COMMERENCE</h3></div>
                <ul className="hul">
                    <li className="hli">
                        <Link className="header-a" to={"/"}>Home</Link>
                       
                    </li>
                    <li className="hli">
                    <Link className="header-a" to={"/card"}>View Card</Link>
                    </li>
                    <li className="hli">
                    <Link className="header-a" to={"/product"}>Product</Link>
                    </li>
                    <li className="hli">
                    <Link className="header-a" to={"/address"}>Address</Link>
                    </li>
                    <li className="hli">
                    <Link className="header-a" to={"/payment"}>Payment</Link>
                    </li>
                </ul>
            </div>
        )
}

export default Header