
import { Link, useLocation } from "react-router-dom";
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
  FaSignInAlt
} from "react-icons/fa";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/tasks", label: "Tasks", icon: <FaListUl /> },
    { to: "/bookmarks", label: "Bookmarks", icon: <FaBookmark /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="fixed bg-neutral-800 top-0 left-0 bottom-0 w-[15%] text-white p-4 shadow-lg flex flex-col justify-between items-center">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-3">
        <img
          src="/favicon.ico"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover border-2 border-white"
        />
        <h2 className="text-xs text-gray-400 text-center break-words px-1">
          {currentUser ? currentUser.email : "Guest User"}
        </h2>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col items-center gap-3 w-full mt-4">
        {navLinks.map((link) => (
          <li key={link.to} className="w-full">
            <Link
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg justify-start w-full transition-all duration-200 ${location.pathname.startsWith(link.to)
                  ? "bg-gray-700 text-cyan-400"
                  : "hover:bg-gray-700 text-gray-300"
                }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}

        {currentUser ? (
          <li className="w-full">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg justify-start text-gray-300 hover:text-red-400 hover:bg-gray-700 transition cursor-pointer">
              <FaSignOutAlt />
              <Logout />
            </div>
          </li>
        ) : (
          <li className="w-full">
            <Link
              to="/signup"
              className="flex items-center gap-3 px-4 py-2 rounded-lg justify-start w-full hover:bg-gray-700 text-gray-300 transition"
            >
             <FaSignInAlt/>
              Signup
            </Link>
          </li>
        )}
      </ul>

      {/* Footer / Social */}
      <div className="flex flex-col items-center gap-2 text-gray-400 text-sm mt-4">
        <div className="flex gap-3 text-xl">
          <a href="https://github.com/believeharsh" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-white transition" />
          </a>
          <a href="https://www.linkedin.com/in/believeharsh11/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-white transition" />
          </a>
          <a href="https://www.instagram.com/theharshdahiya1/#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-white transition" />
          </a>
        </div>
        <h4 className="text-xs text-gray-500">@conserved2024</h4>
      </div>
    </div>
  );
};

export default Sidebar;

