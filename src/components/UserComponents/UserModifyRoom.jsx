import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";

export class UserModifyRoom extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userRooms: [],
            modification: false,
            size: 0,
            error: "",
            valErrors: [],
            success: "",
            active: []
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        UserService.getUserRooms()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        hotelName: response.data[i].hotelName,
                        type: response.data[i].type,
                        size: response.data[i].size,
                        active: response.data[i].active.toString(),
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    userRooms: arr
                })
                this.setState(prev => {
                    return{
                        ...prev,
                        active: this.state.userRooms.filter(value => value.active==="true")
                    }
                })
                console.log(this.state.userRooms);
            }).catch(err => {
                console.log(err.response.data.error);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                } else if(err.response.status === 500){
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
        this.state.userRooms.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.hotelName}</th>
                    <td>{ele.type}</td>
                    <td>
                        {ele.active === "true" ?
                            <input type="text" defaultValue={ele.size} name="size" onChange={this.handleChange} /> :
                            ele.size
                        }
                    </td>
                    <td>{ele.active}</td>
                    <td>{ele.active === "true" ? <button onClick={() => this.handleModification(index, ele.hotelName)} className="btn btn-primary" >Modify</button> : null}</td>
                    <td>{ele.active === "true" ? <button onClick={() => this.handleCancellation(index, ele.hotelName)} className="btn btn-primary">Cancel</button> : null}</td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleChange(event) {
        this.setState(prev => {
            return {
                ...prev,
                size: event.target.value
            }
        })
    }

    handleModification(index, room) {
        console.log(index);
        console.log(room);
        this.setState(prev => {
            return {
                ...prev,
                modification: true
            }
        })
        let roomChoose = this.state.userRooms[index];
        let roomDTO = {
            hotelName: roomChoose.hotelName,
            type: roomChoose.type,
            size: this.state.size === 0 ? roomChoose.size : this.state.size,
            adminEmail: roomChoose.adminEmail
        }
        console.log(roomDTO);

        UserService.updateRoom(roomDTO)
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

    handleCancellation(index, pckg) {
        UserService.deleteRoom()
        .then(res => {
            if (res.status === 200 && res.data === true) {
                this.setState(prev => {
                    return {
                        ...prev,
                        success: "Your Active Package's Room is Deleted"
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

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h2>Modify/ Cancel Room</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Hotel Name</th>
                                    <th>Room Type</th>
                                    <th>Room Size</th>
                                    <th>Active</th>
                                    <th>Modify</th>
                                    <th>Cancel</th>
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
                    <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.active.length===0? "You do Not Have any Active Room. Please Select a Room with Active Package.": null}</div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}