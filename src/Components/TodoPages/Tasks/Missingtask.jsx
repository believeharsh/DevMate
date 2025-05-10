import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"
import { Demotodos } from "../../../utils/DemoUserData.js";
import { useAuth } from "../../../Context/Auth/AuthContext.jsx";

const MissingTasklist = () => {
  const { todos } = useTodo();
  const {currentUser} = useAuth()
  // Filter only important tasks
  const missingTasks = currentUser ? (todos || []).filter(task => task.type === "missing" ) : Demotodos


  return <TaskList tasks={missingTasks} />;
};

export default MissingTasklist;