import React from "react";
import {TaskList} from "../../index.js"
import { useImpTask } from "../../../Context/Todo-Context/ImportantTasks/ImpTaskProvider";

const ImpTasklist = () => {
  const { Tasks, handleEditTask, handledeleteTask, toggleTaskCompletion } = useImpTask();

  return (
    <TaskList
      tasks={Tasks}
      handleEditTask={handleEditTask}
      handleDeleteTask={handledeleteTask}
      toggleTaskCompletion={toggleTaskCompletion}
    />
  );
};

export default ImpTasklist;