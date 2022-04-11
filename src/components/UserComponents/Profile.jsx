import { FooterComponent } from "../FooterComponent";
import React from "react";
import { AsideComponent } from "./AsideComponent";
import UserService from "../../services/UserService";

export class ProfileComponent extends React.Component {
    constructor(props){
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email:"",
            mobile: null,
            error: "",
            valErrors: []
        }
    }

    componentDidMount(){
        UserService.getUser()
        .then(response => {
            console.log(response);
            let details = response.data;
            this.setState({
                firstname: details.firstname,
                lastname: details.lastname,
                email: details.email,
                mobile: details.mobile
            })
        }).catch(err => {
            console.log(err);
            if(err.response.status===403){
                this.props.navigation("/login", {state: {message: "You Have been Logged Out! Please Login Again"}})
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
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="name" name="name" required={true} defaultValue={this.state.firstname} />
                                                </div>
                                                <div className="form-group">
                                                    Email ID:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="email" name="email" required={true} readOnly defaultValue={this.state.email} />
                                                </div>
                                                <div className="form-group">
                                                    Mobile:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="mobile" name="mobile" required={true} defaultValue={this.state.mobile} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" value="Update" className="btn btn-primary" />
                                                    </div>
                                                </div>
                                                <div id="validation"></div>
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