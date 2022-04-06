import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class ModifyAdminRoomComponent extends React.Component {
    constructor(){
        super();
        this.state={
            rooms:[],
            size: "",
            price: 0,
            modification: false
        }
        this.renderRows=this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChanges=this.handleChanges.bind(this);
    }

    componentDidMount(){
        AdminService.getRooms()
        .then(response => {
            console.log(response.data);
            let arr = [];
            for (var i = 0; i < response.data.length; i++) {
                arr.push({
                    hotelName: response.data[i].hotelName,
                    type: response.data[i].type,
                    price: response.data[i].price,
                    size: response.data[i].size
                })
            }
            this.setState({
                rooms: arr
            })
            console.log(this.state.rooms);
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
        this.state.rooms.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.hotelName}</th>
                    <td>{ele.type}</td>
                    <td><input type="text" defaultValue={ele.size} name="size" onChange={this.handleChanges} /></td>
                    <td><input type="number" defaultValue={ele.price} name="price" onChange={this.handleChanges} /></td>
                    <td><button onClick={() => this.handleModification(index, ele.hotelName)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.hotelName)}>Delete</button></td>
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
        let roomChoose = this.state.rooms[index];
        let roomDTO = {
            hotelName: roomChoose.hotelName,
            type: roomChoose.type,
            size: this.state.size==="" ? roomChoose.size: this.state.size,
            price: this.state.price===0 ? roomChoose.price: parseInt(this.state.price),
        }
        console.log(roomDTO);
        console.log(this.state);
        AdminService.updateRoom(roomDTO)
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
                        <h3>Modify / Delete Room</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Hotel Name</th>
                                    <th>Type</th>
                                    <th>Size</th>
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