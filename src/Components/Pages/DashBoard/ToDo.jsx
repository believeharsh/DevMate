// import React from "react";
// import { useTodo } from "../../../Context/Todo-Context/ToDoContext";
// import { MdDone } from "react-icons/md";
// import { useAuth } from "../../../Context/Auth/AuthContext";
// import { Demotodos } from "../../../utils/DemoUserData";

// const ToDo = () => {
//   const { todos, toggleTaskCompletion } = useTodo();
//   const {currentUser} = useAuth() ; 



//   // Filter only today's tasks
//   const todayTasks = currentUser ? (todos || []).filter(task => task.type === "today") : Demotodos

 

//   return (
//     <div className="flex justify-center items-center gap-2 flex-wrap text-white">
//       {todayTasks.map((task) => (
//         <div
//           key={task.id}
//           className="flex justify-between p-2 border-[1px] border-white rounded-md w-full"
//         >
//           <p
//             className={`cursor-pointer font-sans text-xl ${
//               task.completed ? "line-through text-gray-500" : ""
//             } line-clamp-2`}
//           >
//             {task.text}
//           </p>
//           <p className="flex justify-center items-center p-1 border-[1px] border-white rounded-full w-7 h-7 bg-gray-700 hover:border-blue-300 hover:border-[0.6px]">
//           <MdDone onClick={() => toggleTaskCompletion(task.id, task.completed)} />
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ToDo;





import React, { useState } from "react";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext";
import { MdDone, MdAdd, MdClose } from "react-icons/md";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { Demotodos } from "../../../utils/DemoUserData";

const ToDo = () => {
  const { todos, toggleTaskCompletion, addTodo, deleteTodo } = useTodo();
  const { currentUser } = useAuth();
  const [newTask, setNewTask] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter only today's tasks
  const todayTasks = currentUser 
    ? (todos || []).filter(task => task.type === "today") 
    : Demotodos;

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() && currentUser) {
      addTodo({
        text: newTask.trim(),
        type: "today",
        completed: false
      });
      setNewTask("");
      setShowAddForm(false);
    }
  };

  const handleToggleTask = (taskId, currentStatus) => {
    toggleTaskCompletion(taskId, currentStatus);
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      {/* Add Task Button/Form */}
      {currentUser && (
        <div className="mb-1">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex justify-center items-center p-2 border-[1px] border-white rounded-md w-full hover:border-blue-300 hover:border-[0.6px] transition-colors duration-200"
            >
              <MdAdd className="mr-2" />
              <span className="text-sm">Add Task</span>
            </button>
          ) : (
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task..."
                className="flex-1 p-2 bg-gray-700 border-[1px] border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-300 text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="flex justify-center items-center p-2 border-[1px] border-white rounded-md bg-gray-700 hover:border-blue-300 hover:border-[0.6px]"
              >
                <MdDone />
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTask("");
                }}
                className="flex justify-center items-center p-2 border-[1px] border-white rounded-md bg-gray-700 hover:border-red-300 hover:border-[0.6px]"
              >
                <MdClose />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tasks Container with Hidden Scrollbar */}
      <div 
        className="flex flex-col gap-2 max-h-80 overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* Internet Explorer 10+ */
        }}
      >
        {todayTasks.length === 0 ? (
          <div className="flex justify-center items-center p-4 border-[1px] border-gray-500 border-dashed rounded-md">
            <p className="text-gray-400 text-sm">No tasks for today</p>
          </div>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center p-2 border-[1px] border-white rounded-md w-full hover:border-blue-300 hover:border-[0.6px] transition-colors duration-200"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div 
                  onClick={() => handleToggleTask(task.id, task.completed)}
                  className={`flex justify-center items-center p-1 border-[1px] border-white rounded-full w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    task.completed 
                      ? 'bg-green-600 border-green-600' 
                      : 'bg-gray-700 hover:border-blue-300 hover:border-[0.6px]'
                  }`}
                >
                  {task.completed && <MdDone size={12} className="text-white" />}
                </div>

                {/* Task Text */}
                <p
                  className={`cursor-pointer  text-sm flex-1 transition-all duration-200 ${
                    task.completed ? "line-through text-gray-500" : "text-white"
                  } line-clamp-2`}
                  onClick={() => handleToggleTask(task.id, task.completed)}
                >
                  {task.text}
                </p>
              </div>

              {/* Delete Button (only for authenticated users) */}
              {currentUser && (
                <button
                  onClick={() => deleteTodo && deleteTodo(task.id)}
                  className="flex justify-center items-center p-1 border-[1px] border-white rounded-full w-6 h-6 bg-gray-700 hover:border-red-300 hover:border-[0.6px] transition-colors duration-200 ml-2 opacity-0 group-hover:opacity-100"
                >
                  <MdClose size={12} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDo;

