import React from "react";
import "front-end-test/front-test/src/css/Home.css";
// import ".../css/Home.css";

export class UserHeaderComponent extends React.Component {
    constructor(props){
        super();
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav class="top-nav">
                        <ul>
                            <li><a href="../home/Login.jsp">Log Out</a></li>
                            <li><a>Hello </a></li>
                        </ul>
                    </nav>
                    <div id="header">
                        <div class="container">
                            <div align="left">
                                <font size="7">
                                    <p id="title">Tourism</p>
                                </font>
                            </div>
                        </div>
                    </div>
                </header>
                <div id="navbar">
                    <nav class="navbar navbar-default" role="navigation" >
                        <div class="container-fluid">
                            <ul class="nav navbar-nav">
                                <li><a>Welcome to Tourism Management System</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}