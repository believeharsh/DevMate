import React from "react";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext";
import { MdDone } from "react-icons/md";

const ToDo = () => {
  const { todos, toggleTaskCompletion } = useTodo();

  // Filter only today's tasks
  const todayTasks = (todos || []).filter(task => task.type === "today");

 

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap text-white">
      {todayTasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between p-2 border-[1px] border-white rounded-md w-full"
        >
          <p
            className={`cursor-pointer font-sans text-xl ${
              task.completed ? "line-through text-gray-500" : ""
            } line-clamp-2`}
          >
            {task.text}
          </p>
          <p className="flex justify-center items-center p-1 border-[1px] border-white rounded-full w-7 h-7 bg-gray-700 hover:border-blue-300 hover:border-[0.6px]">
          <MdDone onClick={() => toggleTaskCompletion(task.id, task.completed)} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default ToDo;
