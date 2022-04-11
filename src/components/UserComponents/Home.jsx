import React from "react";
import UserService from "../../services/UserService";
import { FooterComponent } from "../FooterComponent";
import { AsideComponent } from "./AsideComponent";

export class UserHomeComponent extends React.Component {
    constructor(props){
        super();
    }
    
    componentDidMount(){
        UserService.getUser()
        .then(res => {})
        .catch(err =>{
            if(err.response.status===403){
                this.props.navigation("/login", {state: {message: "You Have been Logged Out! Please Login Again"}})
                localStorage.removeItem("user");
                window.location.reload();
            }
        })
    }

    render() {
        return (
            <div>
                <AsideComponent />
                <section className="section">
                    <div className="sectiondev">

                        <h3>Welcome To Hell{} </h3>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}