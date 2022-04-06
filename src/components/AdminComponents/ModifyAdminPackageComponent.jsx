import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class ModifyAdminPackageComponent extends React.Component {
    constructor(){
        super();
        this.state={
            packages:[],
            days: 0,
            price: 0,
            modification: false
        }
        this.renderRows=this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChanges=this.handleChanges.bind(this);
    }

    componentDidMount(){
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
        })
    }

    handleChanges(event){
        this.setState(prev =>{
            return{
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
                    <td><button onClick={() => this.handleModification(index, ele.packageName)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.packageName)}>Delete</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleModification(index, pckg){
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
            days: this.state.days===0 ? pckgChoose.days: parseInt(this.state.days),
            price: this.state.price===0? pckgChoose.price: parseFloat(this.state.price)
        }
        console.log(pckgDTO);
        console.log(this.state);
        AdminService.updatePackage(pckgDTO)
        .then(res => {
            console.log(res);
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
                                <tr>
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
                </section>
                <FooterComponent />
            </div>
        )
    }
}