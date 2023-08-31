import React, {Component} from "react";
import {Routes, Route} from "react-router-dom";
import {setCSRFToken} from "./data/axiosCallApi";
import HomeLayout from "./components/layout/HomeLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import Welcome from "./components/pages/Welcome";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/users/Dashboard";
import Profile from "./components/pages/users/Profile";
import Logout from "./components/pages/users/Logout";

class App extends Component {
    async componentDidMount() {
        await setCSRFToken();
    }

    render() {
        return (
            <>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Welcome />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />}/>
                    </Route>
                    <Route path="/user" element={<ProtectedLayout />}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="logout" element={<Logout/>}/>
                    </Route>
                </Routes>
            </>
        )
    }
}

export default App;