import React from "react";
import { TaskList } from "../../index.js";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext.jsx"

const TodayTasklist = () => {
  const { todos } = useTodo();

  // Filter only important tasks

  const todayTasks = (todos || []).filter(task => task.type === "today" );
  

  return <TaskList tasks={todayTasks} />;
};

export default TodayTasklist;

