import React from "react";
import { FooterComponent } from "../FooterComponent";
import { HeaderComponent } from "../HeaderComponent";
import { AsideComponent } from "./AsideComponent";

export class UserHomeComponent extends React.Component {
    
    
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