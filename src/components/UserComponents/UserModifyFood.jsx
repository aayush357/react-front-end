import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";
export class UserModifyFood extends React.Component {
    constructor() {
        super();
        this.state = {
            userFoods: [],
            modification: false,
            quantity: 0
        }
        this.renderRows = this.renderRows.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.handleCancellation = this.handleCancellation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState(prev => {
            return {
                ...prev,
                quantity: event.target.value
            }
        })
    }

    componentDidMount() {
        UserService.getUserFoods()
            .then(response => {
                console.log(response.data);
                let arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        quantity: response.data[i].quantity,
                        active: response.data[i].active.toString(),
                        adminEmail: response.data[i].adminEmail
                    })
                }
                this.setState({
                    userFoods: arr
                })
                console.log(this.state.userFoods);
            }).catch(err => {
                console.log(err.response.data.error);
            })
    }

    renderRows() {
        let list = [];
        this.state.userFoods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td>{ele.type}</td>
                    <td>
                        {ele.active === "true" ?
                            <input type="text" defaultValue={ele.quantity} name="quantity" onChange={this.handleChange} /> :
                            ele.quantity
                        }
                    </td>
                    <td>{ele.active}</td>
                    <td><button onClick={() => this.handleModification(index, ele.name)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.name)}>Cancel</button></td>
                </tr>
            )
            return list;
        })
        return list;
    }

    handleModification(index, food) {
        console.log(index);
        console.log(food);
        this.setState(prev => {
            return {
                ...prev,
                modification: true
            }
        })
        let foodChoose = this.state.userFoods[index];
        let foodDTO = {
            name: foodChoose.name,
            type: foodChoose.type,
            quantity: this.state.quantity,
            adminEmail: foodChoose.adminEmail
        }
        console.log(foodDTO);

        UserService.updateFood(foodDTO)
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
                        <h2>Modify/ Cancel Food</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    {/* <th>No of Days</th> */}
                                    <th>Quantity</th>
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