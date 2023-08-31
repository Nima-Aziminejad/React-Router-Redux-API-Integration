import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

const HomeNavBar = (props) =>{
    if(props.isAuthenticated){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink  className="nav-link" to="/">Welcome</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link" to="/user/dashboard">Dashboard</NavLink >
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/">Welcome</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/login">Login</NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink  className="nav-link"  to="/register">Register</NavLink >
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
    };
};
const componentConnector = connect(mapStateToProps)
export default componentConnector(HomeNavBar)