import React, {Component} from "react";
import {connect} from 'react-redux';
import {getTodosCallAPI, addTodoCallAPI, updateTodosCallAPI, deleteTodosCallAPI} from "../../../data/axiosCallApi";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isButtonDisabled: false,
            todoList: [],
            newTodo: {
                title: '',
                status: 'incomplete'
            },
        }
    }

    componentDidMount() {
        this.getTodoLists();
    }

    getTodoLists = async () => {
        const response = await getTodosCallAPI({
            token: this.props.token,
        });
        if (response.data != null){
            const newDataArray = Object.entries(response.data).map(([key, value]) => {
                const {title, status} = value;
                return {
                    id: key,
                    title: title,
                    status: status
                }
            });
            this.setState({
                todoList: newDataArray
            })
        }

        console.log(this.state.todoList)

    }

    makeTodo = (e) => {
        this.setState({
            newTodo: {
                title: e.target.value
            }
        })
    }
    addTodo = async () => {
        this.setState({
            isButtonDisabled: true
        })
        const response = await addTodoCallAPI({
            token: this.props.token,
            title: this.state.newTodo.title,
        })
        this.setState({
            isButtonDisabled: false
        })
        this.getTodoLists();
        this.setState({
            newTodo: {
                title: ''
            }
        })
    }
    updateTodo = async (id)=>{
        const updatedTodoList = this.state.todoList.map(item =>
            item.id === id ? { ...item, status: item.status === 'incomplete' ? 'completed' : 'incomplete' } : item
        );
        const selectedList = updatedTodoList.find(item => item.id === id);
        this.setState({
            todoList: updatedTodoList,
        });
        const response = await updateTodosCallAPI({
            token: this.props.token,
            id: id,
            status: selectedList.status
        });
        console.log(response);
    }
    deleteTodo = async (id) =>{
        const response = deleteTodosCallAPI({
            token: this.props.token,
            id: id,
        })
        this.getTodoLists();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="page-content page-container" id="page-content">
                            <div className="padding">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12">
                                        <div className="card px-3">
                                            <div className="card-body">
                                                <h4 className="card-title">Awesome Todo list</h4>
                                                <div className="add-items d-flex"><input type="text"
                                                                                         value={this.state.newTodo.title}
                                                                                         onChange={this.makeTodo}
                                                                                         className="form-control todo-list-input"
                                                                                         placeholder="What do you need to do today?"/>
                                                    <button
                                                        className="add btn btn-primary font-weight-bold todo-list-add-btn"
                                                        disabled={this.state.isButtonDisabled}
                                                        onClick={this.addTodo}>Add
                                                    </button>
                                                </div>
                                                <div className="list-wrapper">
                                                    {this.state.todoList !== null ? (
                                                        <ul className="d-flex flex-column-reverse todo-list">
                                                            {
                                                                this.state.todoList.map(item => (
                                                                    <li key={item.id}
                                                                        className={item.status === 'completed' ? 'completed' : ''}>
                                                                        <div className="form-check"><label
                                                                            className="form-check-label">
                                                                            <input
                                                                                className="checkbox"
                                                                                type="checkbox"
                                                                                checked={item.status === "completed"}
                                                                                onChange={()=>this.updateTodo(item.id)}
                                                                            /> {item.title}
                                                                            <i className="input-helper"></i></label></div>
                                                                        <i className="remove mdi mdi-close-circle-outline" onClick={()=>this.deleteTodo(item.id)}></i>
                                                                    </li>
                                                                ))
                                                            }

                                                        </ul>
                                                    ) : (
                                                        <p>gug</p>
                                                    )}

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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        name: state.user.name,
        token: state.user.token,
    }
}
const componentConnector = connect(mapStateToProps)
export default componentConnector(Dashboard);