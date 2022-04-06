import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class AddFoodComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            type: "",
            cost: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }



    handleChanges(event) {

        this.setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        AdminService.addFood(this.state)
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
                            <h2>Add Food</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Select Food Type:
                                                </div>
                                                <div className="form-group">
                                                    <select id="type" className="form-control" name="type" onChange={this.handleChanges}>
                                                        <option selected={true} disabled="disabled">Select</option>
                                                        <option value="Non-Veg">Non-Veg</option>
                                                        <option value="Veg">Veg</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Enter Food Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="foodName" name="name" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="foodCost" name="cost" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" value="Add Food" className="btn btn-primary" onClick={this.handleSubmit} />
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