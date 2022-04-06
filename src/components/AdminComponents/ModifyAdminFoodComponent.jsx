import React from "react";
import AdminService from "../../services/AdminService";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class ModifyAdminFoodComponent extends React.Component {
    constructor(props){
        super();
        console.log(props.navigation);
        this.state={
            foods:[],
            type: "",
            cost: 0,
            modification: false
        }
        this.renderRows=this.renderRows.bind(this);
        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChanges=this.handleChanges.bind(this);
    }

    componentDidMount(){
        AdminService.getFoods()
        .then(response => {
            console.log(response.data);
            let arr = [];
            for (var i = 0; i < response.data.length; i++) {
                arr.push({
                    name: response.data[i].name,
                    type: response.data[i].type,
                    cost: response.data[i].cost,
                })
            }
            this.setState({
                foods: arr
            })
            console.log(this.state.foods);
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
        this.state.foods.map((ele, index) => {
            list.push(
                <tr className="text-center" key={index}>
                    <th scope="row">{ele.name}</th>
                    <td><input type="text" defaultValue={ele.type} name="type" onChange={this.handleChanges} /></td>
                    <td><input type="number" defaultValue={ele.cost} name="cost" onChange={this.handleChanges} /></td>
                    <td><button onClick={() => this.handleModification(index, ele.name)}>Modify</button></td>
                    <td><button onClick={() => this.handleCancellation(index, ele.name)}>Delete</button></td>
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
        let foodChoose = this.state.foods[index];
        let foodDTO = {
            name: foodChoose.name,
            type: this.state.type==="" ? foodChoose.type: this.state.type,
            cost: this.state.cost===0 ? foodChoose.cost: parseInt(this.state.cost),
        }
        console.log(foodDTO);
        console.log(this.state);
        AdminService.updateFood(foodDTO)
        .then(res => {
            console.log(res);
            this.props.navigation("/adminHome");
        })
    }

    render() {
        return (
            <div>
                <AdminAsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Modify / Delete Food</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Name</th>
                                    <th>Type</th>
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