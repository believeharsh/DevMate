import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar, AddNewTask } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx";
import ToDoHeader from "../Header/ToDoHeader.jsx";
import { useAuth } from "../../../Context/Auth/AuthContext.jsx";
import { logUserActivity } from "../../../utils/logActivity.js";
import { motion } from "framer-motion";

const GetTasks = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      logUserActivity(currentUser.uid, "view_tasks");
    }
  }, [currentUser]);

  const location = useLocation();
  const path = location.pathname.split("/").pop(); // today, missing, important

  // Redirect base /tasks route
  if (location.pathname === "/tasks") {
    return <Navigate to="/tasks/today" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6 }}
      className="left-0 right-0 bottom-0 top-0 overflow-auto"
    >
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-neutral-800 bg-opacity-90 backdrop-blur-md border border-neutral-700 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]">
          <div className="text-white text-2xl font-semibold mb-4 capitalize">
            <ToDoHeader />
          </div>

          <div className="mb-6">
            <AddNewTask type={path} />
          </div>

          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default GetTasks;

