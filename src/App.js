import "./App.css";
import React, { useState, useEffect } from "react";
import { MdOutlineDelete, MdEdit, MdOutlineDarkMode } from "react-icons/md";

function App() {
  const [todoVal, setTodoVal] = useState("");
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("todos");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getData = (e) => {
    setTodoVal(e.target.value);
  };

  const handleClick = () => {
    if (todoVal.trim() === "") {
      alert("Please enter a valid value.");
      return;
    }

    let dataStore;

    if (editIndex !== null) {
      dataStore = [...userData];
      dataStore[editIndex] = todoVal;
      setEditIndex(null);
    } else {
      dataStore = [...userData, todoVal];
    }

    setUserData(dataStore);
    setTodoVal("");
    localStorage.setItem("todos", JSON.stringify(dataStore));
  };

  const deleteTodo = (index) => {
    let updatedTodos = [...userData];
    updatedTodos.splice(index, 1);
    setUserData(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const editTodo = (index) => {
    setTodoVal(userData[index]);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <div className={darkMode ? "bgcontainer" : "container"}>
        <div className="d-flex justify-content-between">
          <h1>Todo List</h1>
          <span><MdOutlineDarkMode className="dark_span" onClick={toggleDarkMode}/></span>
  
        </div>
        <div className="input-section">
          <input
            type="text"
            onChange={getData}
            value={todoVal}
            placeholder="Enter Todo"
          />
          <button onClick={handleClick}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {userData.map((item, index) => (
          <div className="user_data" key={index}>
            <h6>{item}</h6>
            <div className="d-flex gap-2">
              <span onClick={() => editTodo(index)}>
                <MdEdit />
              </span>
              <span onClick={() => deleteTodo(index)}>
                <MdOutlineDelete />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
