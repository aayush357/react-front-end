import React from "react";
import authService from "../services/AuthService";
import { FooterComponent } from "./FooterComponent";
import LoaderComponent from "./LoaderComponent";

export class ServiceComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        authService.start()
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }
    render() {
        if (this.state.loading) {
            return (
                // <div>
                //     <div className="loader center">
                //         <Circles
                //             color="#00BFFF"
                //             height={100}
                //             width={100}
                //         />
                //     </div>
                //     <div>
                //         <FooterComponent />
                //     </div>
                // </div>
                <LoaderComponent />
            )
        } else {
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
}