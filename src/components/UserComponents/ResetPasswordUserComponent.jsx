import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
export class ResetPasswordUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPass: "",
            error: "",
            success: ""
        }
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state);
        let requestDTO = {
            email: this.state.email,
            password: this.state.password
        }
        UserService.resetPassword(requestDTO)
            .then(response => {
                console.log(response);
                if (response.status === 200 && response.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your PassWord is Updated"
                        }
                    })
                }
            }).catch(err => {
                if(err.response.status===401){
                    this.setState(prev => {
                        return {
                            ...prev,
                            error: "UserName Not Registered With Us"
                        }
                    });
                }
            })
    }

    render() {
        return (
            <div id="login">
                <div className="row offset-3">
                    <div className="card w-75 text-center" style={{ marginTop: "15px" }}>
                        <div className="card-header">
                            <div className="row" style={{ justifyContent: "space-evenly" }}>
                                <div className="col-xs-6 card-link">
                                    <a href="/#" className="active" id="login-form-link">Reset Password</a>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form method="post" id="login-form"
                                        style={{ display: "block" }}>
                                        <div className="form-group">
                                            <input type="text" name="email" id="username" tabIndex="1"
                                                className="form-control" placeholder="Email Id" onChange={this.handleChanges} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="password" id="password" tabIndex="1"
                                                className="form-control" placeholder="Password" onChange={this.handleChanges} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="confirmPass" id="confirmPassword" tabIndex="1"
                                                className="form-control" placeholder="Confirm Password" onChange={this.handleChanges} required />
                                        </div>
                                        <div className="form-group">
                                            <div className="row" style={{ marginLeft: "260px" }}>
                                                <div className="text-center col-6 col-sm-offset-8">
                                                    <input type="button" name="login-submit" id="loginsubmit"
                                                        tabIndex="4" className="btn btn-primary" value="Reset Password"
                                                        style={{ paddingRight: "5px" }} onClick={this.handleSubmit} />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="validation" style={{color:"red", fontWeight:"700"}}>{this.state.error === "" ? null : this.state.error}</div>
                                        <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                                    </form>
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