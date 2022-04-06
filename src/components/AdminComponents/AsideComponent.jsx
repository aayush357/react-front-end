import React from "react";
export class AdminAsideComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="aside">
                    <ul className="nav navbar-nav">
                        <li><a href="/adminHome">Home</a></li>
                        <li><a href="/addPackage">Add Package</a></li>
                        <li><a href="/addRoom">Add Room</a></li>
                        <li><a href="/addFood">Add Food</a></li>
                        <li><a href="/modifyPackageAdmin">Modify / Delete Package</a></li>
                        <li><a href="/modifyRoomAdmin">Modify / Delete Room</a></li>
                        <li><a href="/modifyFoodAdmin">Modify / Delete Food</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}