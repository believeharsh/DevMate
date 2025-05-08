import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext"; 
import "./Tasks.css";

const AddNewTask = ({ type, handleAddTask }) => {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodo(); 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    handleAddTask({ text: inputValue, type, completed: false }); 
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter task"
          className="NewTask-input"
        />
        <button type="submit" className="NewTask-Add-btn">
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default AddNewTask;
