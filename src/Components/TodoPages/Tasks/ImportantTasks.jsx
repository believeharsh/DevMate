import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"

const ImpTasklist = () => {
  const { todos } = useTodo();

  // Filter only important tasks
  const importantTasks = (todos || []).filter(task => task.type === "important" );


  return <TaskList tasks={importantTasks} />;
};

export default ImpTasklist;