import React from "react";
import { FooterComponent } from "../FooterComponent";
import Utilitites from "../../services/Utilitites";
import { AdminAsideComponent } from "./AsideComponent";
import AdminService from "../../services/AdminService";


export class AddRoomComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            hotelName: "",
            type: "",
            price: 0,
            size: "",
            error: "",
            valErrors: [],
            invalidData: true,
            success: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    componentDidMount() {
        AdminService.getFoods()
            .then()
            .catch(err => {
                Utilitites.isLoggedIn(err.response.status, this.props.navigation);
            })
    }

    handleChanges(event) {
        if (event.target.name === "price") {
            if (event.target.value <= 0) {
                this.setState(prev => {
                    return {
                        ...prev,
                        error: "Please Enter " + event.target.name + " Greater Than 0"
                    }
                })
            } else {
                this.setState(prev => {
                    return {
                        ...prev,
                        error: "",
                        [event.target.name]: event.target.value
                    }
                })
            }
        } else {
            this.setState(prev => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.hotelName && nextState.type && nextState.price>0 && nextState.size && !nextState.error.includes("Please Enter"));
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        AdminService.addRoom(this.state)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Room is Added"
                        }
                    })
                }
            }).catch(err => {
                console.log(err.response);
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
                        <div className="container">
                            <h2>Add Room</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Hotel Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="hotelName" name="hotelName" required={true} onChange={this.handleChanges} />

                                                </div>
                                                <div className="form-group">
                                                    Select Room Type:
                                                </div>
                                                <div className="form-group">
                                                    <select id="roomType" name="type" className="form-control" onChange={this.handleChanges} required={true}>
                                                        <option selected="true" disabled="disabled">Select</option>
                                                        <option defaultValue="AC">AC</option>
                                                        <option defaultValue="Non-AC">Non-AC</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Select Room Size:
                                                </div>
                                                <div className="form-group" >
                                                    <select id="size" name="size" className="form-control" onChange={this.handleChanges} required={true}>
                                                        <option selected="true" disabled="disabled">Select</option>
                                                        <option defaultValue="single">Single</option>
                                                        <option defaultValue="double">Double</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="number" id="roomCost" name="price" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" defaultValue="Add Room" className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.invalidData} />
                                                    </div>
                                                </div>
                                                <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                                                    return <div>{value}</div>
                                                })) : this.state.error}</div>
                                                <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}