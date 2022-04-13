import React from "react";
import "../../css/Home.css"
import "../../css/Aside.css"
export class AsideComponent extends React.Component {
    render() {
        return (
            <div>
                <aside className="aside">
                    <ul className="nav navbar-nav asideinternal">
                        <li><a href="/userHome">Home</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/packages">Select Package</a></li>
                        <li><a href="/rooms">Select Room</a></li>
                        <li><a href="/foods">Select Food</a></li>
                        <li><a href="/modifyPackage">Modify/ Delete Package</a></li>
                        <li><a href="/modifyRoom">Modify/ Delete Room</a></li>
                        <li><a href="/modifyFood">Modify/ Delete Food</a></li>
                        <li><a href="/history">History</a></li>
                        <li><a href="/confirmation">Confirmation</a></li>
                    </ul>

                </aside>
            </div>
        )
    }
}