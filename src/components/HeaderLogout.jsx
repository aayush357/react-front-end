import React from "react";
import authService from "../services/AuthService";
import "../css/Header.css";
export class HeaderLogoutComponent extends React.Component {
    handleLogout = () => {
        authService.logout();
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="top-nav">
                        <ul>
                            <li><a href="/#" onClick={this.handleLogout}>LogOut</a></li>
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
            </div>
        )
    }
}