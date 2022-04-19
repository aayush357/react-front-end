import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
export class ForgotPasswordAdminComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
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

        AdminService.updatePassLink(this.state)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Email With Password Link is Sent to The registered Email-Id"
                        }
                    })
                }
            }).catch(err => {
                console.log(err.response);
                if (err.response.status === 401) {
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
            <div>
                <div id="login">
                    <div className="row offset-3">
                        <div className="card w-75 text-center" style={{ marginTop: "15px" }}>
                            <div className="card-header">
                                <div className="row" style={{ justifyContent: "space-evenly" }}>
                                    <div className="col-xs-6 card-link">
                                        <a href="/login" className="active" id="login-form-link">Forgot Password</a>
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
                                                <div className="row" style={{ marginLeft: "260px" }}>
                                                    <div className="text-center col-6 col-sm-offset-8">
                                                        <input type="button" name="login-submit" id="loginsubmit"
                                                            tabIndex="4" className="btn btn-primary" value="Send Email"
                                                            style={{ paddingRight: "5px" }} onClick={this.handleSubmit} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="validation">{this.state.error === "" ? null : this.state.error}</div>
                                            <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "298px" }}>
                    <FooterComponent />
                </div>
            </div>
        )
    }
}