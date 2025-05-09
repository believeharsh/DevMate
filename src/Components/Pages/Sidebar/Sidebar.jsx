import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useAuth } from "../../../Context/Auth/AuthContext";

const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="fixed bg-neutral-800 top-0 left-0 bottom-0 w-[15%] text-white p-4 shadow-md">
      <div className="flex flex-col justify-between h-full">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src="/Images/fevIcon.png"
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover border-2 border-white"
          />
          <h2 className="text-sm mt-3 text-gray-300">{currentUser.email}</h2>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-2 text-center mt-6">
          <Link to={"/"}>
            <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
              Dashboard
            </li>
          </Link>
          <Link to={"tasks"}>
            <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
              To-Do List
            </li>
          </Link>
          <Link to={"bookmarks"}>
            <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
              Bookmarks
            </li>
          </Link>
          <Link to={"settings"}>
            <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
              Settings
            </li>
          </Link>
          <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
            <Logout />
          </li>
        </ul>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <h4>@conserved2024</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;




