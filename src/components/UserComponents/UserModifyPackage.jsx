import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";

export class UserModifyPackage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userPackages: [],
            modification: "false",
            noOfPersons: 0,
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
                noOfPersons: event.target.value
            }
        })
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
                this.setState(prev => {
                    return{
                        ...prev,
                        active: this.state.userPackages.filter(value => value.active==="true")
                    }
                })
                console.log(this.state.userPackages);
            }).catch(err => {
                console.log(err.response.data.error);
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
                    window.location.reload();
                }
            })
    }
    renderRows() {
        let list = [];
        this.state.userPackages.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.packageName}</th>
                    <td>{ele.place}</td>
                    <td>{ele.price}</td>
                    <td>
                        {ele.active === "true" ?
                            <input type="text" defaultValue={ele.noOfPersons} name="noOfPersons" onChange={this.handleChange} /> :
                            ele.noOfPersons
                        }
                    </td>
                    <td>{ele.active}</td>
                    <td>{ele.active === "true" ? <button className="btn btn-primary" onClick={() => this.handleModification(index, ele.packageName)}>Modify</button> : null}</td>
                    <td>{ele.active === "true" ? <button className="btn btn-primary" onClick={() => this.handleCancellation(index, ele.packageName)}>Cancel</button> : null}</td>

                </tr>
            )
            return list;
        })
        return list;
    }

    handleModification(index, pckg) {
        console.log(index);
        console.log(pckg);
        this.setState(prev => {
            return {
                ...prev,
                modification: "true"
            }
        })
        let pckgChoose = this.state.userPackages[index];
        let pckgDTO = {
            name: pckgChoose.packageName,
            place: pckgChoose.place,
            numberOfPersons: this.state.noOfPersons === 0 ? pckgChoose.noOfPersons : this.state.noOfPersons,
            active: true,
            adminEmail: pckgChoose.adminEmail
        }
        console.log(pckgDTO);
        console.log(this.state);
        UserService.updatePackage(pckgDTO)
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
        UserService.deletePackage()
        .then(res => {
            if (res.status === 200 && res.data === true) {
                this.setState(prev => {
                    return {
                        ...prev,
                        success: "Your Active Package is Deleted"
                    }
                })
            }
            setTimeout(window.location.reload(), 5000);
        }).catch(err => {
            if (err.response.status === 403) {
                // this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                // localStorage.removeItem("user");
                // window.location.reload();
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
                        <h2>Modify/ Cancel Package</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Package Name</th>
                                    <th>Place</th>
                                    {/* <th>No of Days</th> */}
                                    <th>Cost</th>
                                    <th>No of Persons</th>
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
                    <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.active.length===0? "You do Not Have any Active Package. Please Select A package First.": null}</div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}