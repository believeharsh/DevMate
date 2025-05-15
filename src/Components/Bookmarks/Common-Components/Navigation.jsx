import React from "react";
import { NavLink } from "react-router-dom";
import "./Bookmarks.css";
import { Header } from "../../index.js";

const Navigation = () => {
  const linkClass =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  const activeClass = "bg-purple-600 text-white";
  const inactiveClass = "text-gray-300 hover:bg-neutral-800";

  return (
    <div className="bg-neutral-900 px-6 py-3 border-b border-neutral-700">
      <div className="flex justify-between items-center">
        {/* App Header */}
        <div className="text-white text-2xl font-semibold">
          <Header />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <NavLink
            to="socialbm"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Social
          </NavLink>
          <NavLink
            to="codingbm"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Coding
          </NavLink>
          <NavLink
            to="toolsbm"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Tools
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
