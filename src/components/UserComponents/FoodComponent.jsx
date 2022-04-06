import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";

export class UserFoodComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            foods: [],
            quantity: 0
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleBooking = this.handleBooking.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    renderRows() {
        let list = [];
        this.state.foods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td>{ele.type}</td>
                    <td>{ele.cost}</td>
                    <td><button onClick={() => this.handleBooking(index, ele.name)}>Book</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    componentDidMount() {
        UserService.getFoods()
            .then(response => {
                console.log(response);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        cost: response.data[i].cost,
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    foods: arr
                })
            }).catch(err => {
                console.log(err.response.data.error);
            })
    }

    handleQuantity(event){
        this.setState(prev => {
            return {
                ...prev,
                quantity: event.target.value
            }
        })
    }

    handleBooking(index, foodName) {
        console.log(index);
        console.log(foodName);
        let foodChoose = this.state.foods[index];
        let foodDTO = {
            name : foodChoose.name,
            type: foodChoose.type,
            quantity: this.state.quantity,
            adminEmail: foodChoose.adminEmail
        }
        console.log(foodDTO);
        UserService.bookFood(foodDTO)
        .then(res => {
            console.log(res);
        })
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Book Food</h3>
                        <label>Quantity</label>
                        <input type="number" onChange={this.handleQuantity}/>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Type</th>
                                    <th>Food Name</th>
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