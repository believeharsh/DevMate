import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useAuth } from "../../../Context/Auth/AuthContext";

const Sidebar = () => {

  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="fixed bg-neutral-800 top-0 left-0 bottom-0 w-[15%] text-white p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center">
          <img
            src="/Images/fevIcon.png"
            alt="Profile Image"
            className="rounded-full w-24 h-24"
          />
          {/* <h1 className="mt-4 text-lg font-bold">UserName</h1> */}
          <h2 className="text-sm mt-3">{currentUser.email }</h2>
        </div>
        <ul className="space-y-2 text-center">
          <Link to={"/"}>
            <li className="hover:bg-gray-700 px-6 py-2 rounded">Dashboard</li>
          </Link>
          <Link to={"tasks"}>
            <li className="hover:bg-gray-700 px-6 py-2 rounded">To-Do List</li>
          </Link>
          <Link to={"bookmarks"}>
            <li className="hover:bg-gray-700 px-6 py-2 rounded">Bookmarks</li>
          </Link>
          <Link to={"settings"}>
            <li className="hover:bg-gray-700 px-6 py-2 rounded">Settings</li>
          </Link>
          <li className="hover:bg-gray-700 px-6 py-2 rounded">
            <Logout />
          </li>
        </ul>
        <div className="text-center">
          <h4 className="text-xs">@conserved2024</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 