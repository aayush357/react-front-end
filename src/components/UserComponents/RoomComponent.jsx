import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";

export class UserRoomComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            rooms: []
        }
        this.renderRows = this.renderRows.bind(this);
    }

    componentDidMount() {
        UserService.getRooms()
            .then(response => {
                console.log(response);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        hotelName: response.data[i].hotelName,
                        type: response.data[i].type,
                        size: response.data[i].size,
                        price: response.data[i].price,
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    rooms: arr
                })
            }).catch(err => {
                console.log(err.response.data.error);
            })
    }

    handleBooking(index, room){
        console.log(index);
        console.log(room);
        let roomChoose = this.state.rooms[index];
        let roomDTO = {
            hotelName : roomChoose.hotelName,
            type : roomChoose.type,
            size: roomChoose.size,
            adminEmail: roomChoose.adminEmail
        }
        console.log(roomDTO);
        UserService.bookRoom(roomDTO)
        .then(res => {
            console.log(res);
        })
    }

    renderRows() {
        let list = [];
        this.state.rooms.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.hotelName}</th>
                    <td>{ele.type}</td>
                    <td>{ele.size}</td>
                    <td>{ele.price}</td>
                    <td><button onClick={() => this.handleBooking(index, ele.hotelName)}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Book Room</h3>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Hotel Name</th>
                                    <th>Room Type</th>
                                    <th>Room Size</th>
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