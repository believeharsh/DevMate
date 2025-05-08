import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header, Navbar, AddNewTask } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"
import "./AllTasks.css";

const GetTasks = () => {
  const location = useLocation();
  const { addTodo } = useTodo(); 
  const path = location.pathname.split("/").pop(); // today, missing, important

  // Redirect base /tasks route
  if (location.pathname === "/tasks") {
    return <Navigate to="/tasks/today" />;
  }


  return (
    <div className="left-0 right-0 bottom-0 top-0 overflow-auto">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <div className="everything-card border-1 rounded-xl p-5">
          <Header />

          <AddNewTask type={path} handleAddTask={addTodo} />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GetTasks;
