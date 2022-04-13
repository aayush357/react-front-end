import { FooterComponent } from "../FooterComponent";
import React from "react";
import { AsideComponent } from "./AsideComponent";
import UserService from "../../services/UserService";

export class ProfileComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            mobile: null,
            gender: "",
            error: "",
            success: "",
            valErrors: [],
            invalidData: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.firstname && nextState.lastname && nextState.mobile && nextState.address && nextState.gender);
    }


    handleChanges(event) {
        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let dto = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            address: this.state.address,
            mobile: this.state.mobile,
            gender: this.state.gender
        }
        UserService.updateUser(dto)
            .then(res => {
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Profile is Updated"
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
    componentDidMount() {
        UserService.getUser()
            .then(response => {
                console.log(response);
                let details = response.data;
                this.setState({
                    firstname: details.firstname,
                    lastname: details.lastname,
                    email: details.email,
                    mobile: details.mobile,
                    address: details.address,
                    gender: details.gender,
                    aadhar: details.aadhar
                })
            }).catch(err => {
                console.log(err);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                }
            })
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <div className="container">
                            <h2>Profile</h2>
                            <form>
                                <div className="panel col-sm-8">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-sm-4">

                                                <div className="form-group">
                                                    First Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="firstname" name="firstname" required={true} defaultValue={this.state.firstname} onChange={this.handleChanges}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Last Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="lastname" name="lastname" required={true} defaultValue={this.state.lastname}  onChange={this.handleChanges}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Email ID:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="email" name="email" required={true} readOnly defaultValue={this.state.email} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Aadhar Number:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="aadhar" name="aadhar" required={true} readOnly defaultValue={this.state.aadhar} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Gender:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="gender" name="gender" required={true} defaultValue={this.state.gender} onChange={this.handleChanges} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Mobile:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="mobile" name="mobile" required={true} defaultValue={this.state.mobile} onChange={this.handleChanges} />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    Address:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="address" name="address" required={true} defaultValue={this.state.address} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" value="Update" className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.invalidData} />
                                                    </div>
                                                </div>
                                                <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                                                    return <div>{value}</div>
                                                })) : this.state.error}</div>
                                                <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}