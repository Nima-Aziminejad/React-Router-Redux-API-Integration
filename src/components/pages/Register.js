import React,{Component} from "react";
import {connect} from "react-redux";
import {register} from "../../actions/userData";
import { Navigate } from "react-router-dom";
import {registerCallAPI} from "../../data/axiosCallApi";
import Modal from "../../feature/Modal";
class Register extends Component{
    state = {
        name: '',
        email:'',
        password:'',
        isModalOpen: false,
        error :[],
        isButtonDisabled: false,
        emailVerificationMsg: false
    }
    inputChange= (event)=>{
        let value = event.target.value;
        switch(event.target.id){
            case 'name':
                this.setState({name: value});
                break;
            case 'email':
                this.setState({email: value});
                break;
            case 'password':
                this.setState({password: value});
                break;
            default:
                break;
        }
    }
    register = async()=>{
        this.setState({
            isButtonDisabled: true
        })
        const result = await registerCallAPI({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        this.setState({
            isButtonDisabled: false
        })
        if(result.status === 'error'){
            const warning = [];
            Object.keys(result.data).forEach(fieldName => {
                warning.push(result.data[fieldName])
            });
            this.setState({
                password:'',
                error : warning
            })
            this.openModal();
        }else {
            const currentDate = new Date();
            const newValue = {
                isAuthenticated: false,
                name: result.data.name,
                email: result.data.email,
                currentDate: currentDate.getTime()
            }
            this.props.register(newValue)
            this.setState({
                emailVerificationMsg: true
            })
        }

    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        });
    };


    closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    };
    render() {
        if(this.props.isAuthenticated){
            return <Navigate to="/user/dashboard" />
        }
        return(
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="mt-3">
                                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                                    <div className="container">
                                        <div className="row d-flex justify-content-center align-items-center h-100">
                                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                                <div className="card" style={{borderRadius: '15px'}}>
                                                    {
                                                        this.state.emailVerificationMsg ? (
                                                            <div className="card-body p-3">
                                                                <h2 className="text-uppercase text-center mb-2">Verify Your Email</h2>
                                                                <p>
                                                                    Your initial registration has been completed
                                                                    successfully. We have sent an email to your provided
                                                                    email address,
                                                                    <span style={{color:'#e74c3c', fontWeight:'bold'}}>{this.state.email}</span>,
                                                                    containing a verification link. Please proceed to
                                                                    your email inbox, click on the verification link,
                                                                    and once verified, you can log in here.
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <div className="card-body p-3">
                                                                <h2 className="text-uppercase text-center mb-2">Create an account</h2>
                                                                <form>
                                                                    <div className="form-outline mb-2">
                                                                        <input type="text" id="name" onChange={this.inputChange}
                                                                               className="form-control form-control-lg"/>
                                                                        <label className="form-label" htmlFor="name">Your Name</label>
                                                                    </div>
                                                                    <div className="form-outline mb-2">
                                                                        <input type="email" id="email" onChange={this.inputChange}
                                                                               className="form-control form-control-lg"/>
                                                                        <label className="form-label" htmlFor="email">Your Email</label>
                                                                    </div>
                                                                    <div className="form-outline mb-2">
                                                                        <input type="password" value={this.state.password} id="password" onChange={this.inputChange}
                                                                               className="form-control form-control-lg"/>
                                                                        <label className="form-label" htmlFor="password">Password</label>
                                                                    </div>
                                                                    <div className="d-flex justify-content-center">
                                                                        <button type="button" onClick={this.register} disabled={this.state.isButtonDisabled}
                                                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                                                                        </button>
                                                                    </div>

                                                                </form>

                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}>
                    <h2 className="text-center mb-5">Register Error</h2>
                    {
                        this.state.error.map((item, index)=>{
                            return (
                                <p className="m-0" key={index}>{index+1}- {item}</p>
                            )
                        })
                    }
                </Modal>
            </>
        )
    }

}
const mapStateToProps = (state)=>{
    return{
        isAuthenticated: state.user.isAuthenticated,
        isEmailVerified: state.user.isEmailVerified
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        register: (userData)=>dispatch(register(userData))
    }
}
const componentConnector= connect(mapStateToProps,mapDispatchToProps)
export default componentConnector(Register)