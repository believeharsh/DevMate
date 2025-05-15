// import { Link } from "react-router-dom";
// import Logout from "../Auth/Logout";
// import { useAuth } from "../../../Context/Auth/AuthContext";

// const Sidebar = () => {
//   const { currentUser } = useAuth();

//   return (
//     <div className="fixed bg-neutral-800 top-0 left-0 bottom-0 w-[15%] text-white p-4 shadow-md">
//       <div className="flex flex-col justify-between h-full">
//         {/* Profile Section */}
//         <div className="flex flex-col items-center">
//           <img
//             src="/favicon.ico"
//             alt="Profile"
//             className="rounded-full w-24 h-24 object-cover border-2 border-white"
//           />
//           <h2 className="text-sm mt-3 text-gray-300">{currentUser ? currentUser.email : "Guest User"}</h2>
//         </div>

//         {/* Navigation */}
//         <ul className="flex flex-col gap-2 text-center mt-6">
//           <Link to={"/"}>
//             <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//               Dashboard
//             </li>
//           </Link>
//           <Link to={"tasks"}>
//             <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//               To-Do List
//             </li>
//           </Link>
//           <Link to={"bookmarks"}>
//             <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//               Bookmarks
//             </li>
//           </Link>
//           <Link to={"settings"}>
//             <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//               Settings
//             </li>
//           </Link>
//           {
//             currentUser ? (
//               <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//                 <Logout />
//               </li>
//             ) : (
//               <Link to={"signup"}>
//                 <li className="hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
//                   Signup
//                 </li>
//               </Link>
//             )
//           }

//         </ul>

//         {/* Footer */}
//         <div className="text-center text-xs text-gray-500">
//           <h4>@conserved2024</h4>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






import { Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { FaTachometerAlt, FaListUl, FaBookmark, FaCog, FaGithub, FaLinkedin, FaInstagram, FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="fixed bg-neutral-800 top-0 left-0 bottom-0 w-[15%] text-white p-4 shadow-md">
      <div className="flex flex-col justify-between h-full py-2">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img
            src="/favicon.ico"
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover border-2 border-white"
          />
          <h2 className="text-sm mt-3 text-gray-300">
            {currentUser ? currentUser.email : "Guest User"}
          </h2>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-3 mt-2">
          <li>
            <Link to="/" className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="tasks" className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg">
              <FaListUl /> To-Do List
            </Link>
          </li>
          <li>
            <Link to="bookmarks" className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg">
              <FaBookmark /> Bookmarks
            </Link>
          </li>
          <li>
            <Link to="settings" className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg">
              <FaCog /> Settings
            </Link>
          </li>
          {currentUser ? (
            <li>
              <div className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg cursor-pointer">
                <FaSignOutAlt />
                <Logout />
              </div>
            </li>
          ) : (
            <li>
              <Link to="signup" className="flex items-center gap-2 hover:bg-gray-700 transition duration-200 px-4 py-2 rounded-lg">
                Signup
              </Link>
            </li>
          )}
        </ul>


        {/* Footer */}
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
          <h4 className="text-xs">@conserved2024</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;




