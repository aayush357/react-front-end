import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";
import "../../css/table.css"
export class UserFoodComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            foods: [],
            quantity: 0,
            valErrors: [],
            error: "",
            invalidData: true,
            success: "",
            validationError: ""
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    renderRows() {
        let list = [];
        this.state.foods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td>{ele.type}</td>
                    <td>{ele.cost}</td>
                    <td><button className="btn btn-primary" onClick={() => this.handleBooking(index, ele.name)} disabled={this.state.invalidData}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    componentDidMount() {
        UserService.getFoods()
            .then(response => {
                console.log(response);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        cost: response.data[i].cost,
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    foods: arr
                })
            }).catch(err => {
                console.log(err.response.data.error);
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

    handleQuantity(event) {
        if (event.target.value <= 0) {
            this.setState(prev => {
                return {
                    ...prev,
                    validationError: "Please Enter " + event.target.name + " Greater Than 0"
                }
            })
        } else {
            this.setState(prev => {
                return {
                    ...prev,
                    validationError: "",
                    quantity: event.target.value
                }
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.quantity && !nextState.validationError.includes("Please Enter"));
    }

    handleBooking(index, foodName) {
        console.log(index);
        console.log(foodName);
        let foodChoose = this.state.foods[index];
        let foodDTO = {
            name: foodChoose.name,
            type: foodChoose.type,
            quantity: this.state.quantity,
            adminEmail: foodChoose.adminEmail
        }
        console.log(foodDTO);
        UserService.bookFood(foodDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Food is Booked Successfully"
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
                        <h3>Book Food</h3>
                        <div style={{overflow:"hidden", overflowY:"scroll", height:"330px"}}>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Food Type</th>
                                    <th>Food Name</th>
                                    <th>Cost</th>
                                    <th>Book</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows()}
                            </tbody>
                        </table>
                        </div>

                        {this.state.error === "" ? <form><label>Quantity</label>
                            <input type="number" className="form-control" name="quantity" onChange={this.handleQuantity} /></form> : null}

                        <div id="err" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.validationError === "" ? null : this.state.validationError}</div>
                        <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                            return <div>{value}</div>
                        })) : this.state.error}</div>
                        <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}