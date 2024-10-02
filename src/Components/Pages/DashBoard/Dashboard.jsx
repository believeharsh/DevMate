import React from "react";
import ToDo from "./ToDo";
import BookMark from "./Bookmarks";
import { IoUnlink } from "react-icons/io5";
import { Link } from "react-router-dom";
import Activity from "./Activity"
import Watch from "../../DigitalWatch/Watch"


const DashBoard = () => {
  return (
    <>
      <div className="flex h-full space-x-2 overflow-y-auto overflow-x-hidden">
        <div className="w-[50%] flex flex-col space-y-2">
          <div className="bg-neutral-800 w-full h-[45%] p-2 rounded-lg shadow-md">
            <div className="flex w-full mb-2 justify-between">
              <h3 className="text-xl font-sans">Activity</h3>
            </div>
            <div className="">
              <Activity/>
            </div>
          </div>
          <div className="bg-neutral-800 w-full h-[55%] p-2 rounded-lg shadow-md">
            <h3 className="text-xl font-sans mb-2">Tracker</h3>
            <Watch/>
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
