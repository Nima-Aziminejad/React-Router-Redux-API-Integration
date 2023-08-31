import React, {Component} from "react";
import {connect} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import ProtectedNavBar from "./ProtectedNavBar";

class ProtectedLayout  extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            // user is not authenticated
            return <Navigate to="/login" />;
        }else{
            return(
                <>
                    <ProtectedNavBar />
                    <Outlet />
                </>
            );
        }
    }
}
const mapStateToProps = (state)=>{
    return{
        isAuthenticated: state.user.isAuthenticated,
    }
}
const componentConnector= connect(mapStateToProps)
export default componentConnector(ProtectedLayout)