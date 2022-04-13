import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";
export class UserModifyFood extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userFoods: [],
            modification: false,
            quantity: 0,
            error: "",
            valErrors: [],
            success: "",
            active: []
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(prev => {
            return {
                ...prev,
                quantity: event.target.value
            }
        })
    }

    componentDidMount() {
        UserService.getUserFoods()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        quantity: response.data[i].quantity,
                        active: response.data[i].active.toString(),
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    userFoods: arr
                })
                this.setState(prev => {
                    return{
                        ...prev,
                        active: this.state.userFoods.filter(value => value.active==="true")
                    }
                })
                console.log(this.state.userFoods);
            }).catch(err => {
                console.log(err.response.data.error);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                } else if(err.response.status === 500){
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

    renderRows() {
        let list = [];
        this.state.userFoods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td>{ele.type}</td>
                    <td>
                        {ele.active === "true" ?
                            <input type="text" defaultValue={ele.quantity} name="quantity" onChange={this.handleChange} /> :
                            ele.quantity
                        }
                    </td>
                    <td>{ele.active}</td>
                    <td>{ele.active === "true" ? <button  className="btn btn-primary" onClick={() => this.handleModification(index, ele.name)}>Modify</button> : null}</td>
                    <td>{ele.active === "true" ? <button className="btn btn-primary" onClick={() => this.handleCancellation(index, ele.name)}>Cancel</button>: null}</td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleModification(index, food) {
        console.log(index);
        console.log(food);
        this.setState(prev => {
            return {
                ...prev,
                modification: true
            }
        })
        let foodChoose = this.state.userFoods[index];
        let foodDTO = {
            name: foodChoose.name,
            type: foodChoose.type,
            quantity: this.state.quantity === 0 ? foodChoose.quantity : this.state.quantity,
            adminEmail: foodChoose.adminEmail
        }
        console.log(foodDTO);

        UserService.updateFood(foodDTO)
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

    handleCancellation(index, pckg) {
        UserService.deleteFood()
        .then(res => {
            if (res.status === 200 && res.data === true) {
                this.setState(prev => {
                    return {
                        ...prev,
                        success: "Your Active Package's Food is Deleted"
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
                        <h2>Modify/ Cancel Food</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Type</th>
                                    {/* <th>No of Days</th> */}
                                    <th>Quantity</th>
                                    <th>Active</th>
                                    <th>Modify</th>
                                    <th>Cancel</th>
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
                    <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.active.length===0? "You do Not Have any Active Food. Please Select a Food with Active Package.": null}</div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}