import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";

export class UserModifyPackage extends React.Component {
    constructor() {
        super();
        this.state = {
            userPackages: [],
            modification: "false",
            noOfPersons: 0
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChange =this.handleChange.bind(this);
    }

    
    handleChange(event){
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
            console.log(this.state.userPackages);
        }).catch(err => {
            console.log(err.response.data.error);
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
                    <td><button onClick={() => this.handleModification(index, ele.packageName)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.packageName)}>Cancel</button></td>
                    
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
            numberOfPersons: this.state.noOfPersons,
            active: true,
            adminEmail: pckgChoose.adminEmail
        }
        console.log(pckgDTO);
        console.log(this.state);
        UserService.updatePackage(pckgDTO)
        .then(res => {
            console.log(res);
        })
    }

    handleCancellation(index, pckg) {
        console.log(index);
        console.log(pckg);
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
                                <tr>
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
                </section>
                <FooterComponent />
            </div>
        )
    }
}