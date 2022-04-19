import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import Utilitites from "../../services/Utilitites";
import { AdminAsideComponent } from "./AsideComponent";
export class TotalUsersComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            confirmations: [],
            error: "",
            valErrors: [],
        }
        this.renderRows = this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount() {
        AdminService.getConfirmation()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        packageName: response.data[i].packageName,
                        place: response.data[i].place,
                        packageCost: response.data[i].packageCost,
                        roomCost: response.data[i].roomCost,
                        foodCost: response.data[i].foodCost,
                        totalCost: response.data[i].totalCost,
                        foodName: response.data[i].foodName,
                        hotelName: response.data[i].hotelName,
                        firstName: response.data[i].firstName,
                        email: response.data[i].email,
                        date: response.data[i].date.slice(0,10)
                    })
                }
                this.setState({
                    confirmations: arr
                })
                console.log(this.state.confirmations);
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
                    console.log(err.response);
                    Utilitites.isLoggedIn(err.response.status, this.props.navigation);
                }
            })
    }

    renderRows() {
        let list = [];
        this.state.confirmations.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.firstName}</th>
                    <td>{ele.email}</td>
                    <td>{ele.packageName}</td>
                    <td>{ele.place}</td>
                    <td>{ele.packageCost}</td>
                    <td>{ele.hotelName}</td>
                    <td>{ele.roomCost}</td>
                    <td>{ele.foodName}</td>
                    <td>{ele.foodCost}</td>
                    <td>{ele.totalCost}</td>
                    <td>{ele.date}</td>
                </tr>
            )
            return list;
        })
        return list;
    }

    render() {
        return (
            <div>
                <AdminAsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Total Revenue Generated</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Package</th>
                                    <th>Place</th>
                                    <th>Package Cost</th>
                                    <th>Hotel Name</th>
                                    <th>Room Cost</th>
                                    <th>Food Name</th>
                                    <th>Food Cost</th>
                                    <th>Total Cost</th>
                                    <th>Date Started</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.confirmations.length===0? <tr id="err" style={{ color: "green", fontWeight: "700", textAlign: "center" }}><td colSpan={12}>Users have not Selected Any Packages</td></tr>:this.renderRows()}
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