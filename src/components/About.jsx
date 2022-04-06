import { FooterComponent } from "./FooterComponent";
import React from "react"
import { HeaderComponent } from "./HeaderComponent";

export class About extends React.Component {
    render() {
        return (
            <div>
                <div id="sec">
                    <h3 style={{paddingTop:"50px", paddingLeft:"500px"}}>About Us</h3>
                    <div id="matter">
                        <p>&emsp;&emsp;&emsp;&emsp;Online Tourism Management System is an integrated web-based software
                            developed for tour operating
                            companies. The main aim of this project is to help the tourism companies to manage their customers, hotels,
                            vehicles and agents. It makes all operations of the tour company easy and accurate
                        </p>
                        <p>&emsp;&emsp;&emsp;&emsp;
                            Tourism is travel for pleasure; also the theory and practice of touring, the business of attracting, accommodating,
                            and entertaining tourists, and the business of operating tours. Tourism may be international, or within the
                            traveller's country. The World Tourism Organization defines tourism more generally, in terms which go "beyond the
                            common perception of tourism as being limited to holiday activity only", as people "traveling to and staying in
                            places outside their usual environment for not more than one consecutive year for leisure, business and other
                            purposes".
                        </p>
                        <p>&emsp;&emsp;&emsp;&emsp;
                            Tourism can be domestic or international, and international tourism has both incoming and outgoing implications on
                            a country's balance of payments. Today, tourism is a major source of income for many countries, and affects the
                            economy of both the source and host countries, in some cases being of vital importance.
                        </p>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}