import React, {Component} from "react";
import {connect} from "react-redux";
import {login} from "../../actions/userData";
import {Navigate} from "react-router-dom";
import {loginCallAPI} from "../../data/axiosCallApi";
import Modal from "../../feature/Modal";
import {authentication} from '../../services/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
class Login extends Component {
    state = {
        email: '',
        password: '',
        isModalOpen: false,
        error: [],
        isButtonDisabled: false
    }
    inputChange = (event) => {
        let value = event.target.value;
        switch (event.target.id) {
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
    login = async () => {
        this.setState({
            isButtonDisabled: true
        })
        const response = await loginCallAPI({
            email: this.state.email,
            password: this.state.password
        });
        this.setState({
            isButtonDisabled: false
        })
        if(response.status === 'error'){
            const warning = [];
            Object.keys(response.data).forEach(fieldName => {
                warning.push(response.data[fieldName])
            });
            this.setState({
                password: '',
                error : warning
            })
            this.openModal();
        }else{
            const currentDate = new Date();
            const newValue = {
                isAuthenticated: true,
                name: response.data.name,
                email: response.data.email,
                token: response.data.access_token,
                currentDate: currentDate.getTime()
            }
            this.props.login(newValue);
        }
    }
    loginWithGoogle = (e)=>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((result)=>{
                const user = result.user;
                const currentDate = new Date();
                const newValue = {
                    isAuthenticated: true,
                    name: user.displayName,
                    email: user.email,
                    token: user.accessToken,
                    currentDate: currentDate.getTime()
                }
                this.props.login(newValue);
            }).catch((err)=>{
            console.log(err)
        })
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
        if (this.props.isAuthenticated) {
            return <Navigate to="/user/dashboard"/>
        }
        return (
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
                                                    <div className="card-body p-3">
                                                        <h2 className="text-uppercase text-center mb-2">Login</h2>
                                                        <form>
                                                            <div className="form-outline mb-2">
                                                                <input type="email" id="email" onChange={this.inputChange}
                                                                       className="form-control form-control-lg"/>
                                                                <label className="form-label" htmlFor="email">Your
                                                                    Email</label>
                                                            </div>
                                                            <div className="form-outline mb-2">
                                                                <input type="password" id="password"
                                                                       value={this.state.password}
                                                                       onChange={this.inputChange}
                                                                       className="form-control form-control-lg"/>
                                                                <label className="form-label"
                                                                       htmlFor="password">Password</label>
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button type="button" onClick={this.login} disabled={this.state.isButtonDisabled}
                                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login
                                                                </button>
                                                            </div>
                                                        </form>
                                                        <div className="or-container">
                                                            <div className="line-separator"></div>
                                                            <p className="or-label">Or</p>
                                                            <div className="line-separator"></div>
                                                        </div>
                                                        <button onClick={this.loginWithGoogle} className="btn btn-info" style={{width: "100%"}}>Gmail</button>
                                                    </div>
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
                    <h2 className="text-center mb-5">Login Error</h2>
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

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isEmailVerified: state.user.isEmailVerified
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (userData) => dispatch(login(userData))
    }
}
const componentConnector = connect(mapStateToProps, mapDispatchToProps)
export default componentConnector(Login)