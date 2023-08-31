
import { NavLink} from "react-router-dom";
import React, {Component} from "react";
class ProtectedNavBar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/">Home</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/user/dashboard">Dashboard</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/user/profile">Profile</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/user/logout">Logout</NavLink >
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default ProtectedNavBar