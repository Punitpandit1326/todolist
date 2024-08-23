import "./App.css";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

function App() {
  const [todoVal, setTodoVal] = useState();
  const [userData, setUserData] = useState([]);

  const getData = (e) => {
    setTodoVal(e.target.value);
    // console.log(e.target.value);
  };
  const handleClick = () => {
    if (todoVal.trim() === "") {
      alert("Please enter a valid value.");
    } else {
      let dataStore = [...userData, todoVal];
      setUserData(dataStore);
      setTodoVal("");
    }
  };

  const deleteTodo = (index) => {
    let updatedTodos = [...userData];
    updatedTodos.splice(index, 1);
    setUserData(updatedTodos);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>Todo List</h1>
        <div className="input-section">
          <input
            type="text"
            onChange={getData}
            value={todoVal}
            placeholder="Enter Todo"
          />
          <button onClick={handleClick}>Add</button>
        </div>

        {userData.map((item, index) => (
          <div className="user_data" key={index}>
            <h6>{item}</h6>
            <span onClick={() => deleteTodo(index)}>
              {" "}
              <MdOutlineDelete />{" "}
            </span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
