import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import { AdminAsideComponent } from "./AsideComponent";
import Utilitites from "../../services/Utilitites";
export class ModifyAdminFoodComponent extends React.Component {
    constructor(props) {
        super();
        console.log(props.navigation);
        this.state = {
            foods: [],
            type: "",
            cost: 0,
            modification: false,
            error: "",
            valErrors: [],
            success: ""
        }
        this.renderRows = this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    componentDidMount() {
        AdminService.getFoods()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        cost: response.data[i].cost,
                    })
                }
                this.setState({
                    foods: arr
                })
                console.log(this.state.foods);
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

    renderRows() {
        let list = [];
        this.state.foods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td><input type="text" defaultValue={ele.type} name="type" onChange={this.handleChanges} /></td>
                    <td><input type="number" defaultValue={ele.cost} name="cost" onChange={this.handleChanges} /></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleModification(index, ele.name)}>Modify</button></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleCancellation(index, ele.name)}>Delete</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }
    handleCancellation(index, foodName) {
        let foodDTO = {
            name: this.state.foods[index].name,
            cost: this.state.foods[index].cost,
            type: this.state.foods[index].type
        }
        AdminService.deleteFood(foodDTO)
            .then(res => {
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Food is Deleted"
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
    handleModification(index, pckg) {
        this.setState(prev => {
            return {
                ...prev,
                modification: "true"
            }
        })
        let foodChoose = this.state.foods[index];
        let foodDTO = {
            name: foodChoose.name,
            type: this.state.type === "" ? foodChoose.type : this.state.type,
            cost: this.state.cost === 0 ? foodChoose.cost : parseInt(this.state.cost),
        }
        console.log(foodDTO);
        console.log(this.state);
        AdminService.updateFood(foodDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Food is Updated"
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
                        <h3>Modify / Delete Food</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Food Name</th>
                                    <th>Type</th>
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