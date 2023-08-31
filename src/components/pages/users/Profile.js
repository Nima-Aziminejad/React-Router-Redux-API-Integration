import {useState} from "react";
import uuid from 'uuid/v4'
const Profile = (props)=>{
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);
    const updateTaskText = (event)=>{
        setTaskText(event.target.value)
    }
    const addTask = ()=>{
        setTasks([...tasks, {taskText, id: uuid()}]);
    }
    const completeTask = (item)=>{
        setCompleteTasks([...completeTasks, item])
        // eslint-disable-next-line array-callback-return
        setTasks(tasks.filter((task)=>{
            if(task.id !== item.id){
                return task;
            }
        }));
        console.log(completeTasks);
    }
    return(
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-12 d-flex justify-content-center">
                    <div>
                        <h1 className="text-center mb-3">Welcome to your Profile</h1>
                        <br/>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={taskText} onChange={updateTaskText} />
                                <button className="btn btn-secondary" onClick={addTask}>Button
                                </button>
                        </div>
                        <div className="card mt-4">
                            <div className="card-body">
                                <ul>
                                    {
                                        tasks.map((item)=>{
                                            const {id, taskText} = item
                                            return(
                                                <li key={id} onClick={()=>completeTask(item)}>{taskText}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;