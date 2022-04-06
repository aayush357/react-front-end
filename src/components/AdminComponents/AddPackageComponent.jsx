import React from "react";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
import AdminService from "../../services/AdminService";

export class AddPackageComponent extends React.Component {
    constructor(){
        super();
        this.state={
            packageName:"",
            place:"",
            price:"",
            days:0,
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChanges=this.handleChanges.bind(this);
    }

    handleChanges(event){
        this.setState(prev=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }

    handleSubmit(event){
        event.preventDefault();
        AdminService.addPackage(this.state)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        return (
            <div>
                <AdminAsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <div className="container">
                            <h2>Add Package</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Enter Package Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="package" name="packageName" required={true} onChange={this.handleChanges}/>
                                                </div>
                                                <div className="form-group">
                                                    Enter Package Place:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="place" name="place" required={true} onChange={this.handleChanges}/>
                                                </div>
                                                <div className="form-group">
                                                    Enter Number Of Days:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="number" id="days" name="days" required={true} onChange={this.handleChanges}/>
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="packageCost" name="price" required={true} onChange={this.handleChanges}/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" value="Add Package" className="btn btn-primary" onClick={this.handleSubmit}/>
                                                    </div>
                                                </div>
                                                <div id="validation"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}