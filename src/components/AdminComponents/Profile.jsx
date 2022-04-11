import React from "react";
import { FooterComponent } from "../FooterComponent";
import AdminService from "../../services/AdminService";
import { AdminAsideComponent } from "./AsideComponent";
import Utilitites from "../../services/Utilitites";
export class AdminProfileComponent extends React.Component {
    constructor(props){
        super();
    }

    componentDidMount() {
        AdminService.getFoods()
            .then()
            .catch(err => {
                Utilitites.isLoggedIn(err.response.status, this.props.navigation);
            })
    }

    render() {
        return (
            <div>
                <AdminAsideComponent />
                <section className="section">
                    <div className="sectiondev">
                        <h3>Welcome To Admin</h3>
                    </div>
                </section>
                <FooterComponent />
            </div>
        )
    }
}