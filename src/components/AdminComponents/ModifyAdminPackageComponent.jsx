import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import Utilitites from "../../services/Utilitites";
import { AdminAsideComponent } from "./AsideComponent";
export class ModifyAdminPackageComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            packages: [],
            days: 0,
            price: 0,
            modification: false,
            error: "",
            valErrors: [],
            success: ""
        }
        this.renderRows = this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
    }

    componentDidMount() {
        AdminService.getPackages()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        packageName: response.data[i].packageName,
                        place: response.data[i].place,
                        price: response.data[i].price,
                        days: response.data[i].days
                    })
                }
                this.setState({
                    packages: arr
                })
                console.log(this.state.packages);
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
        this.state.packages.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.packageName}</th>
                    <td>{ele.place}</td>
                    <td><input type="text" defaultValue={ele.days} name="days" onChange={this.handleChanges} /></td>
                    <td><input type="text" defaultValue={ele.price} name="price" onChange={this.handleChanges} /></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleModification(index, ele.packageName)}>Modify</button></td>
                    <td><button className="btn btn-primary" onClick={() => this.handleCancellation(index, ele.packageName)}>Delete</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleCancellation(index, packageName) {
        let pckgDTO = {
            packageName: this.state.packages[index].packageName,
            place: this.state.packages[index].place,
            price: this.state.packages[index].price,
            days: this.state.packages[index].days
        }
        AdminService.deletePackage(pckgDTO)
            .then(res => {
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Package is Deleted"
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
                    console.log(err.response);
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
        let pckgChoose = this.state.packages[index];
        let pckgDTO = {
            packageName: pckgChoose.packageName,
            place: pckgChoose.place,
            days: this.state.days <= 0 ? pckgChoose.days : parseInt(this.state.days),
            price: this.state.price <= 0 ? pckgChoose.price : parseFloat(this.state.price)
        }
        console.log(pckgDTO);
        console.log(this.state);
        AdminService.updatePackage(pckgDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Package is Updated"
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
                        <h3>Modify / Delete Package</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Package Name</th>
                                    <th>Place</th>
                                    <th>No of Days</th>
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