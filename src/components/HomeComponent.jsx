import React from "react";
import { FooterComponent } from "./FooterComponent";
import "../css/Login.css";
import "../css/Home.css";

export class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <div style={{padding:"125px", paddingLeft:"500px"}}>
                    <div style={{fontSize:"25px", padding:"10px", backgroundColor:"rgba(255,255,255,0.5)"}}>
                        <h3 style={{paddingBottom:"20px"}}><b>Welcome to Tourism Management System</b></h3>
                        <h4 style={{paddingLeft:"30px"}}>"Its better to <b>See</b> something once than to <b>Hear</b> about it a hundred times"</h4>

                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}