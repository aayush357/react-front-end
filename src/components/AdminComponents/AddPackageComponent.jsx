import React from "react";
import { FooterComponent } from "../FooterComponent";
import Utilitites from "../../services/Utilitites";
import { AdminAsideComponent } from "./AsideComponent";
import AdminService from "../../services/AdminService";

export class AddPackageComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            packageName: "",
            place: "",
            price: "",
            days: 0,
            error: "",
            valErrors: [],
            success: "",
            invalidData: true
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
        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.packageName && nextState.place && nextState.price && nextState.days);
    }

    handleSubmit(event) {
        event.preventDefault();
        AdminService.addPackage(this.state)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Package is Added"
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
                            <h2>Add Package</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Enter Package Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="package" name="packageName" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    Enter Package Place:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="place" name="place" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    Enter Number Of Days:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="number" id="days" name="days" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="packageCost" name="price" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input disabled={this.state.invalidData} type="button" id="button" value="Add Package" className="btn btn-primary" onClick={this.handleSubmit} />
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