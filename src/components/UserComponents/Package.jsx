import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import LoaderComponent from "../LoaderComponent";
import { AsideComponent } from "./AsideComponent";
import "../../css/table.css"
export class UserPackageComponent extends React.Component {
    constructor(props) {
        super();
        this.state = {
            packages: [],
            days: 0,
            noOfPersons: 0,
            date: "",
            error: "",
            valErrors: [],
            success: "",
            invalidData: true,
            loading: true,
            today: new Date().toISOString().split('T')[0]
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleDays = this.handleDays.bind(this);
        this.handlePersons = this.handlePersons.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    handleDays(event) {
        if (event.target.value <= 0) {
            this.setState(prev => {
                return {
                    ...prev,
                    error: "Please Enter " + event.target.name + " Greater Than 0"
                }
            })
        } else {
            this.setState(prev => {
                return {
                    ...prev,
                    error: "",
                    days: event.target.value
                }
            })
        }
    }

    handleChanges(event) {
        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state);
    }

    componentDidMount() {
        // var today = new Date().toISOString().split('T')[0];
        // document.getElementsByName("date")[0].setAttribute('min', today);
        UserService.getPackages()
            .then(response => {
                console.log(response);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        packageName: response.data[i].packageName,
                        place: response.data[i].place,
                        price: response.data[i].price,
                        days: response.data[i].days,
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    packages: arr
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
            }).finally(() => {
                // if (this.state.error === "") {
                //     document.getElementsByName("date")[0].setAttribute('min', today);
                // }
                this.setState(prev => {
                    return {
                        ...prev,
                        loading: false
                    }
                })
            })
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.days && nextState.noOfPersons && nextState.date && !nextState.error.includes("Please Enter"));
    }
    handleBooking(index, pckg) {
        console.log(index);
        console.log(pckg);
        let pckgChoose = this.state.packages[index];
        let pckgDTO = {
            name: pckgChoose.packageName,
            place: pckgChoose.place,
            numberOfPersons: this.state.noOfPersons,
            active: true,
            date: this.state.date.toString(),
            adminEmail: pckgChoose.adminEmail
        }
        console.log(pckgDTO);
        UserService.bookPackage(pckgDTO)
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data === true) {
                    this.setState(prev => {
                        return {
                            ...prev,
                            success: "Your Package is Booked"
                        }
                    })
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    this.props.navigation("/login", { state: { message: "You Have been Logged Out! Please Login Again" } })
                    localStorage.removeItem("user");
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
        this.state.packages.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.packageName}</th>
                    <td>{ele.place}</td>
                    <td>{ele.days}</td>
                    <td>{ele.price}</td>
                    <td><button className="btn btn-primary" onClick={() => this.handleBooking(index, ele.packageName)} disabled={this.state.invalidData}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handlePersons(event) {
        if (event.target.value <= 0) {
            this.setState(prev => {
                return {
                    ...prev,
                    error: "Please Enter " + event.target.name + " Greater Than 0"
                }
            })
        } else {
            this.setState(prev => {
                return {
                    ...prev,
                    error: "",
                    noOfPersons: event.target.value
                }
            })
        }
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div>
                    <AsideComponent />
                    <LoaderComponent message={"Loading ..."} />
                </div>
            )
        } else {
            return (
                <div>
                    <AsideComponent />
                    <section className="section">
                        <div className="sectiondev">
                            <h3>Book Package</h3>
                            <div style={{ overflow: "hidden", overflowY: "scroll", height: "310px" }}>
                                <table className="table table-striped" id="packagetable">
                                    <thead>
                                        <tr className="text-center">
                                            <th>Package Name</th>
                                            <th>Place</th>
                                            <th>No of Days</th>
                                            <th>Cost</th>
                                            <th>Book</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRows()}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.error === "" ?
                                <form>
                                    <label >Number of Days</label>
                                    <input type="number" className="form-control" name="Days" style={{ marginBottom: "10px" }} onChange={this.handleDays} />
                                    <label >Date</label>
                                    <input type="date" className="form-control" name="date" style={{ marginBottom: "10px" }} min={this.state.today} onChange={this.handleChanges} />
                                    <label>Number of Persons</label>
                                    <input type="number" className="form-control" name="persons" onChange={this.handlePersons} />
                                </form> : null}
                        </div>
                        <div id="validation" style={{ color: "green", fontWeight: "700", textAlign: "center" }}>{this.state.success === "" ? null : this.state.success}</div>
                        <div id="validation" style={{ color: "red", fontWeight: "700", textAlign: "center" }}>{this.state.error === "" ? (this.state.valErrors === null ? null : this.state.valErrors.map((value, index) => {
                            return <div>{value}</div>
                        })) : this.state.error}</div>
                    </section>
                    <FooterComponent />
                </div>
            )
        }
    }
}