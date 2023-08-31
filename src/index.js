import React from 'react';
import ReactDOM from 'react-dom/client';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import rootReducer from "./reducers/index";
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from "history";
import {initUserData} from './actions/userData'
import App from './App';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';

const store = configureStore({
    reducer: rootReducer
});

const userData = JSON.parse(localStorage.getItem('my_app_user'));
if (userData) {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - userData.currentDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if(hoursDifference < 4){
        store.dispatch(initUserData(userData))
    }else{
        window.localStorage.removeItem('my_app_user');
    }

}


const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
