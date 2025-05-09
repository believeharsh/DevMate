import React, { useEffect } from "react";
import ToDo from "./ToDo";
import BookMark from "./Bookmarks";
import { IoUnlink } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserActivityChart from "../../../Charts/UserActivityChart";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { logUserActivity } from "../../../utils/logActivity";
import DailyFocus from "./DailyFocus";



const DashBoard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      logUserActivity(currentUser.uid, "view_dashboard");
    }
  }, [currentUser]);

  return (
    <>
      <div className="flex h-full space-x-2 overflow-y-auto overflow-x-hidden">
        <div className="w-[50%] flex flex-col space-y-2">
          <div className="bg-neutral-800 flex-1 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Activity</h3>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <UserActivityChart />
            </div>
          </div>
          <div className="bg-neutral-800 w-full h-[55%] p-2 rounded-lg shadow-md">
            <h3 className="text-xl font-sans mb-2">Tracker</h3>
            <DailyFocus/>
          </div>
        </div>

        <div className="w-[50%] flex space-x-2 justify-between h-full">
          <div className="bg-neutral-800 w-full p-2 rounded-lg shadow-md">
            <div className="flex w-full mb-2  justify-between">
              <h3 className="text-xl font-sans">Tasks</h3>

              <Link to="tasks/today">
                <IoUnlink className="text-white text-2xl cursor-pointer" />
              </Link>
            </div>

            <ToDo />
          </div>
          <div className="bg-neutral-800 w-full p-2 rounded-lg shadow-md">
            <div className="flex w-full mb-2  justify-between">
              <h3 className="text-xl font-sans">BookMarks</h3>

              <Link to="bookmarks/codingbm">
                <IoUnlink className="text-white text-2xl cursor-pointer" />
              </Link>
            </div>
            <BookMark />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;





