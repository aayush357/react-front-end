import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";

export class UserModifyRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            userRooms: [],
            modification: false,
            size: 0
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        UserService.getUserRooms()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        hotelName: response.data[i].hotelName,
                        type: response.data[i].type,
                        size: response.data[i].size,
                        active: response.data[i].active.toString(),
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    userRooms: arr
                })
                console.log(this.state.userRooms);
            }).catch(err => {
                console.log(err.response.data.error);
            })
    }

    renderRows() {
        let list = [];
        this.state.userRooms.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.hotelName}</th>
                    <td>{ele.type}</td>
                    <td>
                    {ele.active === "true" ?
                        <input type="text" defaultValue={ele.size} name="size" onChange={this.handleChange} /> :
                        ele.size
                    }
                    </td>
                    <td>{ele.active}</td>
                    <td><button onClick={() => this.handleModification(index, ele.hotelName)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.hotelName)}>Cancel</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleChange(event){
        this.setState(prev => {
            return {
                ...prev,
                size: event.target.value
            }
        })
    }

    handleModification(index, room) {
        console.log(index);
        console.log(room);
        this.setState(prev => {
            return {
                ...prev,
                modification: true
            }
        })
        let roomChoose = this.state.userRooms[index];
        let roomDTO = {
            hotelName : roomChoose.hotelName,
            type : roomChoose.type,
            size: this.state.size,
            adminEmail: roomChoose.adminEmail
        }
        console.log(roomDTO);

        UserService.updateRoom(roomDTO)
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
                        <h2>Modify/ Cancel Room</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Hotel Name</th>
                                    <th>Room Type</th>
                                    <th>Room Size</th>
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