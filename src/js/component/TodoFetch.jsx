
import React, { useEffect, useState } from "react";

const TodoFetch = () => {

    const [task, setTask] = useState("");

    const [taskList, setTaskList] = useState([]);

    const [error, setError] = useState(false)

    const [active, setActive] = useState(false)

    useEffect(() => { getTasks() }, [])

    async function getTasks() {
        try {
            const response = await fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Jorgecasadob',
                {
                    method: "GET",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                });

            if (response.ok) {
                const body = await response.json();
                setTaskList(body);
                setTask("");
            } else {
                createUser();
                console.log("error obtaining a tesk");
            }
        }
        catch (exceptionVar) {
            console.log(exceptionVar);
        }

    }
    const handleTask = (event) => {
        setTask(event.target.value);
    }
    const addTask = async (event) => {
        if (event.key == "Enter") {
            const newTodo = {
                label: setTask,
                done: false
            }
            if (event.target.value == "") {
                setError(true);

                alert("Please add a task!");

                return;
            }
            try {
                const response = await fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Jorgecasadob',
                    {
                        method: "PUT",
                        headers:
                        {
                            "Content-Type": "application/json"
                        }
                        , body: JSON.stringify([...taskList, { label: task, done: false }])
                    });
                if (response.ok) {
                    getTasks();
                    setTask("");
                } else {
                    console.log("error obtaining a tesk");
                }
            }
            catch (exceptionVar) {
                console.log(exceptionVar);
            }
            setError(false);
        }
    }
    const deleteTask = async (Id) => {
        console.log(Id);

        const newTodo = taskList.filter((task, index) => index != Id);

        try {
            const response = await fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Jorgecasadob',
                {
                    method: "PUT",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                    , body: JSON.stringify(newTodo)
                });

            if (response.ok) {
                getTasks();
                setTask("");
            } else {
                console.log("error obtaining a tesk");
            }
        }
        catch (exceptionVar) {
            console.log(exceptionVar);
        }
    }
    const deleteTodo = async () => {
        try {
            const response = await fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Jorgecasadob',
                {
                    method: "DELETE",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                });
            if (response.ok) {
                getTasks();
            } else {
                console.log("error deleting tasks");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const createUser = async () => {
        try {
            const response = await fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Jorgecasadob',
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                    , body: JSON.stringify([])
                });
                if (response.ok) {
                    getTasks();
                }
        } catch (error) {
            console.log(error);
          } 
        }
    const deleteAllTasks = () => {
        deleteTodo();
    }
    return (

        <div className="text-center vh-100 text-light bg-dark d-flex align-items-center justify-content-center gap-3 flex-column">

            <label htmlFor="task" className={`${error ? "text-danger fw-bold" : "light"}`}><strong>Task List</strong></label>

            <input className="bg-dark text-light" type="text" id="task" value={task} onKeyDown={addTask} onChange={handleTask} />
            <div>
                <ul>
                    {
                        taskList.map((task, index) => {
                            return <li className="task" key={index}>{task.label}<span className="delete" onClick={() => deleteTask(index)}> x </span></li>
                        })
                    }
                </ul>
            </div>
            <div>
                {taskList.length === 0
                    ? "No tasks listed yet "
                    : taskList.length + " Items Left"}
            </div>
            {taskList.length > 0 && <button type="button" className="btn btn-secondary" onClick={deleteAllTasks}>Close all tasks</button>}
        </div>
    );
};
export default TodoFetch; 