import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";
export class UserPackageComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            packages: [],
            days: 0,
            noOfPersons: 0
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleDays = this.handleDays.bind(this);
        this.handlePersons = this.handlePersons.bind(this);
    }

    handleDays(event){
        this.setState(prev => {
            return {
                ...prev,
                days: event.target.value
            }
        })
    }

    componentDidMount(){
        UserService.getPackages()
        .then(response => {
            console.log(response);
            let arr = [];
            for (var i=0; i<response.data.length; i++){
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
        })
    }

    handleBooking(index, pckg){
        console.log(index);
        console.log(pckg);
        let pckgChoose = this.state.packages[index];
        let pckgDTO = {
            name : pckgChoose.packageName,
            place : pckgChoose.place,
            numberOfPersons: this.state.noOfPersons,
            active: true,
            adminEmail: pckgChoose.adminEmail
        }
        console.log(pckgDTO);
        UserService.bookPackage(pckgDTO)
        .then(res => {
            console.log(res);
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
                    <td><button onClick={() => this.handleBooking(index, ele.packageName)}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handlePersons(event){
        this.setState(prev => {
            return {
                ...prev,
                noOfPersons: event.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Book Package</h3>
                        <label>Number of Days</label>
                        <input type="number" onChange={this.handleDays}/>
                        <label>Number of Persons</label>
                        <input type="number" onChange={this.handlePersons}/>
                        <table className="table table-striped" id="packagetable">
                            <thead>
                                <tr>
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
                </section>
                <FooterComponent />
            </div>
        )
    }
}