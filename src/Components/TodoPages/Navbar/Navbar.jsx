import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "../../index.js";

const Navbar = () => {
  const linkClass =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  const activeClass = "bg-purple-600 text-white";
  const inactiveClass = "text-gray-300 hover:bg-neutral-800";

  return (
    <div className="px-8 py-1 font-libre text-white border-b border-neutral-800 bg-neutral-900 shadow-sm z-10">
      <div className="flex justify-between items-center">

        {/* App Header/Title */}
        <div className="text-white text-2xl font-semibold">
          <Header />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <NavLink
            to="today"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Today
          </NavLink>
          <NavLink
            to="important"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Important
          </NavLink>
          <NavLink
            to="missing"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Missing
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
