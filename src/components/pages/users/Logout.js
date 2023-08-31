import React from "react";
import {connect} from "react-redux";
import {logout} from "../../../actions/userData";
import {logoutCallAPI} from "../../../data/axiosCallApi";

class Logout extends React.Component{
    logout = async()=>{
        const response = await logoutCallAPI({
            name: this.props.name,
            token: this.props.token
        });
        if(response.status === 'error'){
            console.log('problem');
        }else {
            this.props.logout();
        }
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-12 d-flex justify-content-center">
                        <div>
                            <h1 className="text-center mb-3">Logout</h1>
                            <button type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        isAuthenticated: state.user.isAuthenticated,
        name: state.user.name,
        token: state.user.token,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        logout: ()=>dispatch(logout())
    }
}
const componentConnector= connect(mapStateToProps,mapDispatchToProps)
export default componentConnector(Logout);