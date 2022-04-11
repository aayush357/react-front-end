import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";

export class UserRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            rooms: [],
            error: "",
            valErrors: [],
            success: ""
        }
        this.renderRows = this.renderRows.bind(this);
    }

    componentDidMount() {
        UserService.getRooms()
            .then(response => {
                console.log(response);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        hotelName: response.data[i].hotelName,
                        type: response.data[i].type,
                        size: response.data[i].size,
                        price: response.data[i].price,
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    rooms: arr
                })
            }).catch(err => {
                console.log(err.response.data.error);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                }
            })
    }

    handleBooking(index, room) {
        console.log(index);
        console.log(room);
        let roomChoose = this.state.rooms[index];
        let roomDTO = {
            hotelName: roomChoose.hotelName,
            type: roomChoose.type,
            size: roomChoose.size,
            adminEmail: roomChoose.adminEmail
        }
        console.log(roomDTO);
        UserService.bookRoom(roomDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Room is Booked Successfully"
                        }
                    })
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                } else if (err.response.status === 500) {
                    if (err.response.data.messages !== null) {
                        this.setState(prev => {
                            return {
                                ...prev,
                                valErrors: err.response.data.messages
                            }
                        })
                    } else {
                        this.setState(prev => {
                            return {
                                ...prev,
                                error: err.response.data.message
                            }
                        })
                    }
                }
            })
    }

    renderRows() {
        let list = [];
        this.state.rooms.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.hotelName}</th>
                    <td>{ele.type}</td>
                    <td>{ele.size}</td>
                    <td>{ele.price}</td>
                    <td><button className="btn btn-primary" onClick={() => this.handleBooking(index, ele.hotelName)}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Book Room</h3>

                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Hotel Name</th>
                                    <th>Room Type</th>
                                    <th>Room Size</th>
                                    <th>Cost</th>
                                    <th>Book</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows()}
                            </tbody>
                        </table>
                        <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                            return <div>{value}</div>
                        })) : this.state.error}</div>
                        <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                        </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}