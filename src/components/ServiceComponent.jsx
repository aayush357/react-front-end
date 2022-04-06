import React from "react";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";

export class ServiceComponent extends React.Component {
    render() {
        return (
            <div>
                <div id="sec">
                    <h3 style={{ paddingTop: "50px", paddingLeft: "500px" }}>Services</h3>
                    <div id="matter" style={{ padding: "30px 80px" }}>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td><b>Packages</b></td>
                                    <td>You can select your own package with your own place</td>
                                </tr>
                                <tr>
                                    <td width="20%"><b>Hotels and Rooms</b></td>
                                    <td>We have different types of hotels, in each hotel we have AC or Non-AC Rooms
                                        and different types of sizes like Single and Double room. You can modify or cancel the room any time.
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Food</b></td>
                                    <td>
                                        We provide different types of food in both Veg and Non-Veg
                                    </td>
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