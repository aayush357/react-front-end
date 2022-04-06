import React from "react";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
import AdminService from "../../services/AdminService";


export class AddRoomComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            hotelName: "",
            type: "",
            price: 0,
            size: "",
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

        AdminService.addRoom(this.state)
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
                            <h2>Add Room</h2>
                            <div className="panel col-sm-8">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <form>
                                                <div className="form-group">
                                                    Hotel Name:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="text" id="hotelName" name="hotelName" required={true} onChange={this.handleChanges} />

                                                </div>
                                                <div className="form-group">
                                                    Select Room Type:
                                                </div>
                                                <div className="form-group">
                                                    <select id="roomType" name="type" className="form-control" onChange={this.handleChanges} required={true}>
                                                        <option selected="true" disabled="disabled">Select</option>
                                                        <option value="AC">AC</option>
                                                        <option value="Non-AC">Non-AC</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Select Room Size:
                                                </div>
                                                <div className="form-group" >
                                                    <select id="size" name="size" className="form-control" onChange={this.handleChanges} required={true}>
                                                        <option selected="true" disabled="disabled">Select</option>
                                                        <option value="single">Single</option>
                                                        <option value="double">Double</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    Enter Cost:
                                                </div>
                                                <div className="form-group">
                                                    <input className="form-control" type="number" id="roomCost" name="price" required={true} onChange={this.handleChanges} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="text-right">
                                                        <input type="button" id="button" value="Add Room" className="btn btn-primary" onClick={this.handleSubmit} />
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