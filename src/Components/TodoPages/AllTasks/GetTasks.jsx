import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {  Navbar, AddNewTask } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"
import "./AllTasks.css";
import ToDoHeader from "../Header/ToDoHeader.jsx";
import { useAuth } from "../../../Context/Auth/AuthContext.jsx";
import { logUserActivity } from "../../../utils/logActivity.js";

const GetTasks = () => {
    const { currentUser } = useAuth();
  
    useEffect(() => {
      if (currentUser?.uid) {
        logUserActivity(currentUser.uid, "view_dashboard");
      }
    }, [currentUser]);

  const location = useLocation();
  const path = location.pathname.split("/").pop(); // today, missing, important

  // Redirect base /tasks route
  if (location.pathname === "/tasks") {
    return <Navigate to="/tasks/today" />;
  }


  return (
    <div className="left-0 right-0 bottom-0 top-0 overflow-auto">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="everything-card border-1 rounded-xl p-5">
          <ToDoHeader />

          <AddNewTask type={path}/>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GetTasks;
