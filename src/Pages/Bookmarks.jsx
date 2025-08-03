import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AddnewBM } from "../../index.js";

// import "../Common-Components/Bookmarks.css";
// import Navigation from "./Navigation";
// import { useBookmarks } from "../../../Context/BookMark-Context/BookMarkContext.jsx";
// import { useAuth } from "../../../Context/Auth/AuthContext.jsx";
// import { logUserActivity } from "../../../utils/logActivity.js";
import "../Components/Bookmarks/Common-Components/Bookmarks.css" ; 
import Navigation from "../Components/Bookmarks/Common-Components/Navigation.jsx";
import { useBookmarks } from "../Context/BookMark-Context/BookMarkContext.jsx";
import { useAuth } from "../Context/Auth/AuthContext.jsx";
import { logUserActivity } from "../utils/logActivity.js";

const GetBM = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      logUserActivity(currentUser.uid, "view_bookmarks");
    }
  }, [currentUser]);

  const { addBookmark } = useBookmarks();
  const location = useLocation();
  const path = location.pathname.split("/").pop().toLowerCase(); // e.g., "codingbm"

  if (location.pathname === "/bookmarks") {
    return <Navigate to="/bookmarks/Codingbm" />;
  }

  const normalizedCategory = path.replace("bm", "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.6 }}
    >
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-neutral-800 bg-opacity-90 backdrop-blur-md  border border-neutral-700 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01]">
          <h2 className="text-white text-2xl font-semibold mb-4 capitalize">
            {normalizedCategory} Bookmarks
          </h2>

          <div className="mb-6">
            <AddnewBM category={normalizedCategory} handleAddBM={addBookmark} />
          </div>

          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default GetBM;
