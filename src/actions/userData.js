import {INIT_USER_DATA,USER_LOGIN,USER_LOGOUT} from "./types";

export const initUserData = (data) => {
    return {
        type: INIT_USER_DATA,
        isAuthenticated: data.isAuthenticated,
        name: data.name,
        email: data.email,
        token: data.token
    }
}

export const login = (data) => {
    window.localStorage.setItem('my_app_user', JSON.stringify(data));
    return {
        type: USER_LOGIN,
        isAuthenticated: data.isAuthenticated,
        name: data.name,
        email: data.email,
        token: data.token
    }
}
export const register =(data)=>{
    return {
        type: USER_LOGIN,
        isAuthenticated: data.isAuthenticated,
        name: data.name,
        email: data.email,
        token: data.token
    }
}
export const logout =()=>{
    window.localStorage.removeItem('my_app_user');
    return {
        type: USER_LOGOUT,
        isAuthenticated: false,
        name: '',
        email: '',
        token: ''
    }
}
