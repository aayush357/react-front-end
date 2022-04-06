import React from "react";
import UserService from "../services/UserService";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";
export class RegisterUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            aadhar: "",
            lastname: "",
            firstname: "",
            mobile: 0,
            gender: "",
            password: "",
            address: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event){
        event.preventDefault();
        UserService.registerUser(this.state)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.response);
        })
    }

    handleChange(event) {
        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <div id="login">
                <div className="row offset-3">
                <div class="card w-75 text-center" style={{ marginTop: "15px" }}>
                    <div class="card-header">
                        <div className="row" style={{justifyContent:"space-evenly"}}>
                            <div className="col-xs-6 card-link">
                                <a href="/login" className="active" id="login-form-link">Login</a>
                            </div>
                            <div className="col-xs-6">
                                <a href="/register" id="register-form-link">Register</a>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div class="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <form method="post" id="login-form"
                                    style={{ display: "block" }}>
                                    <div className="form-group">
                                                        <input type="text" name="firstname" id="firstname" tabIndex="1" className="form-control" placeholder="First Name" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" name="lastname" id="lastname" tabIndex="2" className="form-control" placeholder="Last Name" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" name="email" id="email" tabIndex="3" className="form-control" placeholder="Email ID" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" name="aadhar" id="aadhar" tabIndex="4" className="form-control" placeholder="Aadhar" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" name="gender" id="gender" tabIndex="5" className="form-control" placeholder="Gender" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" name="password" id="password" tabIndex="6" className="form-control" placeholder="Password" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="number" name="mobile" id="mobile" tabIndex="7" className="form-control" placeholder="Mobile" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" name="address" id="address" tabIndex="8" className="form-control" placeholder="Address" onChange={this.handleChange}/>
                                                    </div>
                                    <div className="form-group">
                                        <div className="row" style={{ marginLeft: "260px" }}>
                                            <div className="text-center col-6 col-sm-offset-8">
                                                <input type="button" name="login-submit" id="loginsubmit"
                                                    tabIndex="4" className="btn btn-primary" value="Register"
                                                    style={{ paddingRight: "5px" }} onClick={this.handleRegister}/>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="text-center">
                                                    <a href="www.google.com" tabIndex="5" className="forgot-password">Forgot
                                                        Password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div id="validation"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    
                </div>
                <FooterComponent />
            </div>
        )
    }
}