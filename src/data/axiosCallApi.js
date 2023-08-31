import axios from 'axios'
import {BASE_URL, CSRF_URL, REGISTER_URL, LOGOUT_URL,LOGIN_URL, GET_TODOS_URL, ADD_TODO_URL, UPDATE_TODO_URL, DELETE_TODO_URL} from "./callAPIUrl";

export const setCSRFToken = async () => {
    try {
        await axios.get(BASE_URL+CSRF_URL, {withCredentials: true})
    } catch (error) {
        console.error('Failed to set CSRF token:', error);
    }
}
export const registerCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+REGISTER_URL,JSON.stringify(data),{
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        console.error('Error:', error);
    }
}
export const loginCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+LOGIN_URL,JSON.stringify(data),{
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data;
    }catch(error) {
        console.error('Error:', error);
    }
}
export const logoutCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+LOGOUT_URL,JSON.stringify({
            user: data.name
        }),{
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        return {
            data: 'You are unauthorized',
            status:  'error'
        }
    }
}
export const addTodoCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+ADD_TODO_URL,JSON.stringify({
            title: data.title
        }),{
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        return {
            data: 'You are unauthorized',
            status:  'error'
        }
    }
}
export const getTodosCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+GET_TODOS_URL,JSON.stringify({}),{
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        return {
            data: 'You are unauthorized',
            status:  'error'
        }
    }
}
export const updateTodosCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+UPDATE_TODO_URL,JSON.stringify({
            id: data.id,
            status: data.status,
        }),{
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        return {
            data: 'You are unauthorized',
            status:  'error'
        }
    }
}
export const deleteTodosCallAPI = async (data)=>{
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(BASE_URL+DELETE_TODO_URL,JSON.stringify({
            id: data.id,
        }),{
            headers: {
                Authorization: `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }catch(error) {
        return {
            data: 'You are unauthorized',
            status:  'error'
        }
    }
}