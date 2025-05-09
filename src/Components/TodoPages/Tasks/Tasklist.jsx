import React, { useState, useRef, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Tasks.css";
import { useTodo } from "../../../Context/Todo-Context/ToDoContext";

const TaskList = ({ tasks }) => {
  const { editTodo, toggleTaskCompletion, deleteTodo } = useTodo();
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [panelOpenId, setPanelOpenId] = useState(null);
  const panelRefs = useRef({});
  const buttonRefs = useRef({});

  const handleEditInputChange = (e) => {
    setEditedTaskText(e.target.value);
  };

  const handleEditSubmit = async (taskId) => {
    if (editedTaskText.trim() !== "") {
      await editTodo(taskId, { text: editedTaskText });
      setEditTaskId(null);
      setEditedTaskText("");
    } else {
      alert("Task can't be empty");
    }
  };

  const handleKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      handleEditSubmit(taskId);
    }
  };

  const togglePanel = (taskId) => {
    setPanelOpenId(panelOpenId === taskId ? null : taskId);
  };

  const openEditPanel = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTaskText(taskToEdit.text);
  };

  const handleClickOutside = (e) => {
    if (panelOpenId) {
      const panelRef = panelRefs.current[panelOpenId];
      const buttonRef = buttonRefs.current[panelOpenId];

      if (
        panelRef &&
        !panelRef.contains(e.target) &&
        buttonRef &&
        !buttonRef.contains(e.target)
      ) {
        setPanelOpenId(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelOpenId]);

  return (
    <div>
      <ul>
        {tasks.map((task) => {
          const isEditing = task.id === editTaskId;
          const isPanelOpen = panelOpenId === task.id;

          return (
            <li
              key={task.id}
              className={`Tasklist-li cursor-pointer font-sans text-xl ${task.completed ? "line-through text-gray-500" : ""
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="checkbox"
                    className="cursor-pointer "
                    checked={task.completed}
                    onChange={() =>
                      toggleTaskCompletion(task.id, task.completed)
                    }
                  />
                  {isEditing ? (
                    <div className="flex w-full">
                      <input
                        type="text"
                        value={editedTaskText}
                        onChange={handleEditInputChange}
                        onKeyDown={(event) => handleKeyPress(event, task.id)}
                        className="Task-input"
                      />
                      <button onClick={() => handleEditSubmit(task.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <span className="line-clamp-2">{task.text}</span>
                  )}
                </div>

                <div className="relative">
                  {!isEditing && (
                    <>
                      <button
                        className="three-dot-btn"
                        onClick={() => togglePanel(task.id)}
                        ref={(el) => (buttonRefs.current[task.id] = el)}
                      >
                        <BsThreeDotsVertical className="mx-1 my-1" />
                      </button>
                      {isPanelOpen && (
                        <div
                          ref={(el) => (panelRefs.current[task.id] = el)}
                          className="threedot-panel"
                        >
                          <button
                            className="threedot-panel-btns"
                            onClick={() => openEditPanel(task.id)}
                          >
                            <CiEdit className="text-xl" />
                            <span className="ml-2 text-sm">Edit</span>
                          </button>
                          <button
                            className="threedot-panel-btns"
                            onClick={() => deleteTodo(task.id)}
                          >
                            <MdDeleteOutline className="text-xl" />
                            <span className="ml-2 text-sm">Delete</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
