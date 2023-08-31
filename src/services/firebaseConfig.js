import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBrkETMQc-lMjh5upH5j8mhjIBGgkbt6yI",
    authDomain: "laravel-react-9cc21.firebaseapp.com",
    databaseURL: "https://laravel-react-9cc21-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "laravel-react-9cc21",
    storageBucket: "laravel-react-9cc21.appspot.com",
    messagingSenderId: "1218090586",
    appId: "1:1218090586:web:70924dec28941584ddea63",
    measurementId: "G-DWKSF7S5T0"
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
