import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import Utilitites from "../../services/Utilitites";
import { AdminAsideComponent } from "./AsideComponent";
export class ModifyAdminRoomComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            size: "",
            price: 0,
            modification: false,
            error: "",
            success: "",
            valErrors: []
        }
        this.renderRows = this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    componentDidMount() {
        AdminService.getRooms()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        hotelName: response.data[i].hotelName,
                        type: response.data[i].type,
                        price: response.data[i].price,
                        size: response.data[i].size
                    })
                }
                this.setState({
                    rooms: arr
                })
                console.log(this.state.rooms);
            }).catch(err => {
                console.log(err.response.data.error);
                Utilitites.isLoggedIn(err.response.status, this.props.navigation);
            })
    }

    handleChanges(event) {
        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    handleCancellation(index, roomName) {
        let roomDTO = {
            hotelName: this.state.rooms[index].hotelName,
            size: this.state.rooms[index].size,
            type: this.state.rooms[index].type,
            price: this.state.rooms[index].price
        }
        AdminService.deleteRoom(roomDTO)
            .then(res => {
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Room is Updated"
                        }
                    })
                }
            }).catch(err => {
                if (err.response.status === 500) {
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
                } else {
                    Utilitites.isLoggedIn(err.response.status, this.props.navigation);
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
                    <td><input type="text" defaultValue={ele.size} name="size" onChange={this.handleChanges} /></td>
                    <td><input type="number" defaultValue={ele.price} name="price" onChange={this.handleChanges} /></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleModification(index, ele.hotelName)}>Modify</button></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleCancellation(index, ele.hotelName)}>Delete</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleModification(index, pckg) {
        this.setState(prev => {
            return {
                ...prev,
                modification: "true"
            }
        })
        let roomChoose = this.state.rooms[index];
        let roomDTO = {
            hotelName: roomChoose.hotelName,
            type: roomChoose.type,
            size: this.state.size === "" ? roomChoose.size : this.state.size,
            price: this.state.price === 0 ? roomChoose.price : parseInt(this.state.price),
        }
        console.log(roomDTO);
        console.log(this.state);
        AdminService.updateRoom(roomDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Room is Updated"
                        }
                    })
                }
            }).catch(err => {
                if (err.response.status === 500) {
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
                } else {
                    Utilitites.isLoggedIn(err.response.status, this.props.navigation);
                }
            })
    }

    render() {
        return (
            <div>
                <AdminAsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Modify / Delete Room</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Hotel Name</th>
                                    <th>Type</th>
                                    <th>Size</th>
                                    <th>Cost</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                    <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                                                return <div>{value}</div>
                                            })) : this.state.error}</div>
                    <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}