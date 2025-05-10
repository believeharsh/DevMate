import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"
import { useAuth } from "../../../Context/Auth/AuthContext.jsx";
import { Demotodos } from "../../../utils/DemoUserData.js";

const TodayTasklist = () => {
  const { todos } = useTodo();
  const {currentUser} = useAuth() ; 
  // Filter only important tasks

  const todayTasks = currentUser ? (todos || []).filter(task => task.type === "today" ) : Demotodos
  

  return <TaskList tasks={todayTasks} />;
};

export default TodayTasklist;

