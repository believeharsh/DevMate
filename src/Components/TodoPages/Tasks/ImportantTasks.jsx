import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"
import { useAuth } from "../../../Context/Auth/AuthContext.jsx";
import { Demotodos } from "../../../utils/DemoUserData.js";

const ImpTasklist = () => {
  const { todos } = useTodo();
  const {currentUser} = useAuth()


  // Filter only important tasks
  const importantTasks = currentUser ? (todos || []).filter(task => task.type === "important" ) : Demotodos


  return <TaskList tasks={importantTasks} />;
};

export default ImpTasklist;