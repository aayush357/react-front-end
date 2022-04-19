import React from "react";
import "../css/Header.css";
export class HeaderComponent extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="top-nav">
                        <ul>
                            <li><a href="/login">LogIn</a></li>
                            <li><a href="/adminLogin">Admin</a></li>
                        </ul>
                    </nav>
                    <div id="header">
                        <div className="container">
                            <div align="left">
                                <font size="7">
                                    <p id="title">Tourism</p>
                                </font>
                            </div>
                        </div>
                    </div>
                </header>
                <header>
                    <div id="navbar">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/" style={{fontSize:"1.1rem"}}><img src="home.png" style={{width:"22px", verticalAlign:"text-top"}} alt="#" />Home</a>
                            <div className="navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/about">About<span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{color:"black"}} href="/services">Services</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{color:"black"}} href="/contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}