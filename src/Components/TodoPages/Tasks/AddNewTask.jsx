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

    addTodo({ text: inputValue, type, completed: false });
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-3 items-center w-full bg-neutral-900 p-4 rounded-xl shadow-md">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter task"
          className="w-full md:w-3/4 px-5 py-3 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
        />
        <button type="submit"         className="mt-2 md:mt-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2">
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default AddNewTask;
