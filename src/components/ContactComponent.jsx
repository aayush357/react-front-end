import React from "react";
import { FooterComponent } from "./FooterComponent";
export class ContactComponent extends React.Component {
    render() {
        return (
            <div>
                <div id="sec">
                    <h3 style={{ paddingTop: "50px", paddingLeft: "500px" }}>Contact Us</h3>
                    <div style={{ padding: "30px 450px" }}>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td><h4><b>Tourism Management System</b></h4></td>
                                </tr>
                                <tr>
                                    <td><b>Address:</b></td>
                                </tr>
                                <tr>
                                    <td>CDAC-Bangalore</td>
                                </tr>
                                <tr>
                                    <td><b>Mobile:</b></td>
                                </tr>
                                <tr>
                                    <td>9123456789</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}