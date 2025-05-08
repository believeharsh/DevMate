import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"

const MissingTasklist = () => {
  const { todos } = useTodo();

  // Filter only important tasks
  const missingTasks = (todos || []).filter(task => task.type === "missing" );


  return <TaskList tasks={missingTasks} />;
};

export default MissingTasklist;