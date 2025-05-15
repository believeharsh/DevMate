import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ToDo from "./ToDo";
import BookMark from "./Bookmarks";
import { IoUnlink } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserActivityChart from "../../../Charts/UserActivityChart";
import ChartsButtons from "../../../Charts/ChartsButtons";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { logUserActivity } from "../../../utils/logActivity";
import DailyFocus from "./DailyFocus";

const DashBoard = () => {
  const { currentUser } = useAuth();
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    if (currentUser?.uid) {
      logUserActivity(currentUser.uid, "view_dashboard");
    }
  }, [currentUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row h-full space-y-4 lg:space-y-0 lg:space-x-4 overflow-y-auto overflow-x-hidden"
    >
      {/* Left Column */}
      <div className="w-full lg:w-[50%] flex flex-col space-y-4">
        {/* Activity Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-800 flex-1 p-4 rounded-2xl shadow-md bg-opacity-90 backdrop-blur-md transition hover:scale-[1.01]"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-cyan-400">Activity</h3>
            <ChartsButtons chartType={chartType} setChartType={setChartType} />
          </div>
          <div className="flex justify-center items-center">
            <UserActivityChart chartType={chartType} />
          </div>
        </motion.div>

        {/* Daily Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-neutral-800 flex-1 p-4 rounded-2xl shadow-md bg-opacity-90 backdrop-blur-md transition hover:scale-[1.01]"
        >
          <h3 className="text-xl font-semibold text-emerald-400 mb-2">Tracker</h3>
          <DailyFocus />
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[50%] flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-full">
          {/* Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-neutral-800 flex-1 p-4 rounded-2xl shadow-md bg-opacity-90 backdrop-blur-md transition hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-yellow-400">Tasks</h3>
              <Link to="/tasks/today">
                <IoUnlink className="text-white text-2xl cursor-pointer" />
              </Link>
            </div>
            <ToDo />
          </motion.div>

          {/* Bookmarks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-neutral-800 flex-1 p-4 rounded-2xl shadow-md bg-opacity-90 backdrop-blur-md transition hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-purple-400">Bookmarks</h3>
              <Link to="/bookmarks/codingbm">
                <IoUnlink className="text-white text-2xl cursor-pointer" />
              </Link>
            </div>
            <BookMark />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashBoard;











