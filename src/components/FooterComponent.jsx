import React from "react"
import "../css/Header.css"
export class FooterComponent extends React.Component {
    render() {
        return (
            <footer>
                <div id="footer">
                    <div>
                        <div>
                            <div className="panel-body" align="Center">&copy; copywrite TourismManagementSystem.com</div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}