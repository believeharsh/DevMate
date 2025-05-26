import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Logout from "../Auth/Logout";
import { useAuth } from "../../../Context/Auth/AuthContext";
import {
  FaTachometerAlt,
  FaListUl,
  FaBookmark,
  FaCog,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({isCollapsed, toggleSidebar}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/tasks", label: "Tasks", icon: <FaListUl /> },
    { to: "/bookmarks", label: "Bookmarks", icon: <FaBookmark /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  const isActiveRoute = (linkTo) => {
    return location.pathname === linkTo || 
           (linkTo !== '/dashboard' && location.pathname.startsWith(linkTo));
  };

  return (
    <div 
      className={`fixed bg-neutral-800 top-0 left-0 bottom-0 text-white shadow-lg flex flex-col transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4 ">
        <button
          onClick={toggleSidebar}
          className="text-gray-300 mt-2 hover:text-white transition-colors duration-200 focus:outline-none  rounded"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
      </div>

      {/* Profile Section */}
      <div className={`flex flex-col items-center gap-3 px-4 ${isCollapsed ? 'px-2 py-2' : 'px-4'}`}>
        <img
          src={currentUser?.profileImage || "/DevMate_Logo.png"}
          alt="Profile"
          className={`rounded-full object-cover border-2 border-white transition-all duration-300 ${
            isCollapsed ? 'w-8 h-8' : 'w-20 h-20'
          }`}
          onError={(e) => {
            e.target.src = "/favicon.ico";
          }}
        />
        {!isCollapsed && (
          <h2 className="text-xs text-gray-400 text-center break-words px-1">
            {currentUser ? currentUser.email : "Guest User"}
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 mt-6">
        <ul className={`flex flex-col gap-2 w-full ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {navLinks.map((link) => (
            <li key={link.to} className="w-full">
              <Link
                to={link.to}
                aria-label={`Navigate to ${link.label}`}
                title={isCollapsed ? link.label : ''}
                className={`flex items-center gap-3 py-3 rounded-lg transition-all duration-200 group ${
                  isCollapsed ? 'px-3 justify-center' : 'px-4 justify-start'
                } ${
                  isActiveRoute(link.to)
                    ? "bg-gray-700 text-cyan-400"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span className={`${isCollapsed ? 'text-lg' : 'text-base'}`}>
                  {link.icon}
                </span>
                {!isCollapsed && <span className="whitespace-nowrap">{link.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {link.label}
                  </div>
                )}
              </Link>
            </li>
          ))}

          {/* Auth Section */}
          {currentUser ? (
            <li className="w-full">
              <div 
                className={`flex items-center gap-3 py-3 rounded-lg text-gray-300 hover:text-red-400 hover:bg-gray-700 transition cursor-pointer group ${
                  isCollapsed ? 'px-3 justify-center' : 'px-4 justify-start'
                }`}
                title={isCollapsed ? 'Logout' : ''}
              >
                <span className={`${isCollapsed ? 'text-lg' : 'text-base'}`}>
                  <FaSignOutAlt />
                </span>
                {!isCollapsed && <Logout />}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Logout
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li className="w-full">
              <Link
                to="/signup"
                title={isCollapsed ? 'Signup' : ''}
                className={`flex items-center gap-3 py-3 rounded-lg hover:bg-gray-700 text-gray-300 transition group ${
                  isCollapsed ? 'px-3 justify-center' : 'px-4 justify-start'
                }`}
              >
                <span className={`${isCollapsed ? 'text-lg' : 'text-base'}`}>
                  <FaSignInAlt />
                </span>
                {!isCollapsed && <span>Signup</span>}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Signup
                  </div>
                )}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Footer / Social */}
      <div className={`flex flex-col items-center gap-2 text-gray-400 text-sm p-4 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}>
        <div className={`flex gap-3 ${isCollapsed ? 'flex-col gap-2' : 'flex-row gap-3'}`}>
          <a 
            href="https://github.com/believeharsh" 
            target="_blank" 
            rel="noopener noreferrer"
            title="GitHub"
            className="hover:text-white transition group relative"
          >
            <FaGithub className={`${isCollapsed ? 'text-base' : 'text-xl'}`} />
            {isCollapsed && (
              <div className="absolute left-8 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                GitHub
              </div>
            )}
          </a>
          <a 
            href="https://www.linkedin.com/in/believeharsh11/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:text-white transition group relative"
          >
            <FaLinkedin className={`${isCollapsed ? 'text-base' : 'text-xl'}`} />
            {isCollapsed && (
              <div className="absolute left-8 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                LinkedIn
              </div>
            )}
          </a>
          <a 
            href="https://www.instagram.com/theharshdahiya1/#" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Instagram"
            className="hover:text-white transition group relative"
          >
            <FaInstagram className={`${isCollapsed ? 'text-base' : 'text-xl'}`} />
            {isCollapsed && (
              <div className="absolute left-8 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Instagram
              </div>
            )}
          </a>
        </div>
        {!isCollapsed && (
          <h4 className="text-xs text-gray-500">@conserved2024</h4>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
