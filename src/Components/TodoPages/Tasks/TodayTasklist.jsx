import React from "react";
import {TaskList} from "../../index.js"
import { useTodayTask } from "../../../Context/Todo-Context/TodayTasks/TodayTaskProvider";

const TodayTasklist = () => {
  const { Tasks, handleEditTask, handledeleteTask, toggleTaskCompletion } = useTodayTask();

  return (
    <TaskList
      tasks={Tasks}
      handleEditTask={handleEditTask}
      handleDeleteTask={handledeleteTask}
      toggleTaskCompletion={toggleTaskCompletion}
    />
  );
};

export default TodayTasklist;