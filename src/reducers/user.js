import {INIT_USER_DATA,USER_LOGIN, USER_LOGOUT} from "../actions/types";

const USER_SETTING = {
    isAuthenticated: false,
    name: null,
    email: null,
    token: null
}
const userReducer = (state = USER_SETTING, action) => {
    switch (action.type) {
        case INIT_USER_DATA:
            return {
                ...state,
                isAuthenticated:action.isAuthenticated,
                name:action.name,
                email:action.email,
                token:action.token
            }
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated:action.isAuthenticated,
                name:action.name,
                email:action.email,
                token:action.token
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated:action.isAuthenticated,
                name:action.name,
                email:action.email,
                token:action.token
            };
        default:
            return state
    }
}
export default userReducer;