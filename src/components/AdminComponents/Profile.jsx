import React from "react";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AdminAsideComponent } from "./AsideComponent";
export class AdminProfileComponent extends React.Component {
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