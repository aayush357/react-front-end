import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";

export class ConfirmationComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userPackages: [],
            bill: false,
            balance: 1000,
            confirmation: [],
            error: "",
            valErrors: [],
            modification: "",
            success: ""
        }
        this.handlePayment = this.handlePayment.bind(this);
        this.handleCalculateBill = this.handleCalculateBill.bind(this);
        this.renderBill = this.renderBill.bind(this);
        this.renderRows = this.renderRows.bind(this);
    }

    componentDidMount() {
        UserService.getUserPackages()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        packageName: response.data[i].name,
                        place: response.data[i].place,
                        noOfPersons: response.data[i].numberOfPersons,
                        price: response.data[i].cost,
                        active: response.data[i].active.toString(),
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    userPackages: arr
                })
                console.log(this.state.userPackages);
            }).catch(err => {
                console.log(err);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                } else {
                    this.setState(prev => {
                        return {
                            ...prev,
                            error: err.response.data.message
                        }
                    })
                }
            })
    }

    handlePayment(index, pckg) {
        console.log(index);
        console.log(pckg);
        let pckgChoose = this.state.userPackages[index];
        let confirmationDTO = {
            packageName: pckgChoose.packageName,
            balance: this.state.balance
        }
        UserService.doPayment(confirmationDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Payment is Done"
                        }
                    })
                }
            }).catch(err => {
                console.log(err.response);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
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

    renderRows() {
        let list = [];
        this.state.userPackages.map((ele, index) => {
            list.push(
                ele.active === "true" ?
                    <tr className="text-center" key={index}>
                        <th scope="row">{ele.packageName}</th>
                        <td>{ele.place}</td>
                        <td>{ele.price}</td>
                        <td>{ele.noOfPersons}</td>
                        <td>{ele.active}</td>
                        <td><button onClick={() => this.handleCalculateBill(index, ele.packageName)}>Calculate Bill</button></td>
                    </tr> : null
            )
            return list;
        })
        return list;
    }

    handleCalculateBill(index, pckg) {
        this.setState(prev => {
            return {
                ...prev,
                bill: true
            }
        })
        let pckgChoose = this.state.userPackages[index];
        let confirmationDTO = {
            packageName: pckgChoose.packageName,
            balance: this.state.balance
        }
        console.log(this.state);
        UserService.getBill(confirmationDTO)
            .then(response => {
                let obj = {
                    packageName: response.data.packageName,
                    place: response.data.place,
                    packageCost: response.data.packageCost,
                    roomCost: response.data.roomCost,
                    foodCost: response.data.foodCost,
                    totalCost: response.data.totalCost,
                    foodName: response.data.foodName,
                    hotelName: response.data.hotelName
                }
                let arr = [];
                arr.push(obj);
                this.setState(prev => {
                    return {
                        ...prev,
                        confirmation: arr
                    }
                })
            }).catch(err => {
                console.log(err.response.data);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                }else if (err.response.status === 500) {
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

    renderBill() {
        let list = [];

        this.state.confirmation.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.packageName}</th>
                    <td>{ele.place}</td>
                    <td>{ele.packageCost}</td>
                    <td>{ele.hotelName}</td>
                    <td>{ele.roomCost}</td>
                    <td>{ele.foodName}</td>
                    <td>{ele.foodCost}</td>
                    <td>{ele.totalCost}</td>
                    <td><button className="btn btn-primary" onClick={() => this.handlePayment(index, ele.packageName)}>Pay</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    render() {
        const renderAuth = () => {
            if (this.state.bill) {
                console.log("here inside func");
                return (<table className="table table-striped">
                    <thead>
                        <tr className="text-center">
                            <th>Package</th>
                            <th>Place</th>
                            <th>Package Cost</th>
                            <th>Hotel Name</th>
                            <th>Room Cost</th>
                            <th>Food Name</th>
                            <th>Food Cost</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBill()}
                    </tbody>
                </table>)
            } else {
                return null
            }
        }

        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h2>Confirmation Details</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Place</th>
                                    <th>Cost</th>
                                    <th>No of Persons</th>
                                    <th>Active</th>
                                    <th>Calculate Bill</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows()}
                            </tbody>
                        </table>
                    </div>
                    {renderAuth()}
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