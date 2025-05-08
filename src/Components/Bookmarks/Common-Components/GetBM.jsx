import React from "react";
import { AddnewBM } from "../../index.js";
import "../Common-Components/Bookmarks.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { useBookmarks } from "../../../Context/BookMark-Context/BookMarkContext.jsx";

const GetBM = () => {
  const {addBookmark} = useBookmarks() ; 
  const location = useLocation();
  const path = location.pathname.split("/").pop().toLowerCase(); // e.g., "codingbm"

  // Redirect to "/bookmarks/Codingbm" if the path is exactly "/bookmarks"
  if (location.pathname === "/bookmarks") {
    return <Navigate to="/bookmarks/Codingbm" />;
  }

  // Normalize category name (e.g., "Codingbm" => "coding")
  const normalizedCategory = path.replace("bm", "");

  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div className="AllBMs-container">
        <div className="AllBMs-wrapper">
          <div className="everything-card">
            <div className="AllBMs-addnewbm-section">
              <AddnewBM category={normalizedCategory} handleAddBM={addBookmark}/>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetBM;
