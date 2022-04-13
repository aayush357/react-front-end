import React from "react";
import AdminService from "../../services/AdminService";
import Utilitites from "../../services/Utilitites";
import { FooterComponent } from "../FooterComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class AddFoodComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: "",
            type: "",
            cost: 0,
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
        nextState.invalidData = !(nextState.name && nextState.type && nextState.cost);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        AdminService.addFood(this.state)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Food is Added"
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
                            <h2>Add Food</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Select Food Type:
                                                </div>
                                                <div className="form-group">
                                                    <select id="type" className="form-control" name="type" onChange={this.handleChanges}>
                                                        <option selected={true} disabled="disabled">Select</option>
                                                        <option defaultValue="Non-Veg">Non-Veg</option>
                                                        <option defaultValue="Veg">Veg</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Enter Food Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="foodName" name="name" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="foodCost" name="cost" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" disabled={this.state.invalidData} id="button" value="Add Food" className="btn btn-primary" onClick={this.handleSubmit} />
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