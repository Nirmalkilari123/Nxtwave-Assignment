import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = (taskName, quantity) => {
    const newTasks = [...tasks];
    for (let i = 0; i < quantity; i++) {
      newTasks.push(taskName);
    }
    setTasks(newTasks);
    setTaskCount(taskCount + quantity);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setTaskCount(taskCount - 1);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = () => {
    const newTasks = [...tasks];
    newTasks[editIndex] = editedTask;
    setTasks(newTasks);
    setEditIndex(null);
  };

  return (
    <div className="App">
      <h1>Daily Goals!</h1>
      <div>
        <input type="text" id="taskInput" />
        <button
          onClick={() => {
            const input = document.getElementById("taskInput");
            const taskName = input.value.trim().split(" ")[0];
            const quantity = parseInt(input.value.trim().split(" ")[1]) || 1;
            if (taskName) {
              addTask(taskName, quantity);
              input.value = "";
            }
          }}
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
              </>
            ) : (
              <>
                <input  className="input" type="text" value={task} />
               <button className="button" onClick={() => editTask(index)}>Edit</button>
                <button className="button1" onClick={() => deleteTask(index)}>Delete</button>
               
                
              </>
            )}
          </li>
        ))}
      </ul>
      <p>Total Tasks: {taskCount}</p>
    </div>
  );
}
