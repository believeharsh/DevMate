import React, { useState } from "react";
import { useTodayTask } from "../../../Context/Todo-Context/TodayTasks/TodayTaskProvider";
import { MdDone } from "react-icons/md";

const ToDo = () => {
  const { Tasks, toggleTaskCompletion } = useTodayTask();
  const [pendingCompletion, setPendingCompletion] = useState({});
  
  const handleTaskClick = (taskId) => {
    // if the task is already pending completion
    if (pendingCompletion[taskId]) {
      // User clicked again, cancel the pending completion
      clearTimeout(pendingCompletion[taskId].timeoutId); 
      setPendingCompletion((prev) => {
        const updated = { ...prev };
        delete updated[taskId];
        return updated;
      });
    } else {
      // Mark the task for completion after delay
      const timeoutId = setTimeout(() => {
        toggleTaskCompletion(taskId);
        setPendingCompletion((prev) => {
          const updated = { ...prev };
          delete updated[taskId];
          return updated;
        });
      }, 120000); 

      setPendingCompletion((prev) => ({
        ...prev,
        [taskId]: { timeoutId },
        
      }));
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap text-white">
      {Tasks.map((task) => {
        const isTaskCompleted = task.completed;
        const isPending = !!pendingCompletion[task.id];

        return !isTaskCompleted ? (
          <div
            key={task.id}
            className="flex justify-between p-2 border-[1px] border-white rounded-md w-full"
          >
            <p
              className={`cursor-pointer font-sans text-xl ${
                isPending ? "line-through text-gray-500" : ""
              } line-clamp-2`}
            >
              {task.text}
            </p>
            <p className="flex justify-center items-center p-1 border-[1px] border-white rounded-full w-7 h-7 bg-gray-700 hover:border-blue-300 hover:border-[0.6px]">
              <MdDone onClick={() => handleTaskClick(task.id)} />
            </p>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ToDo;