import React from "react";
import {AddnewBM} from "../../index.js"
import { UseSocialBM } from "../../../Context/BookMark-Context/Social-Context/SocialContext-Provider";
import { UseToolsBM } from "../../../Context/BookMark-Context/Tools-Context/ToolsContext-Provider";
import "../Common-Components/Bookmarks.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseCodingBM } from "../../../Context/BookMark-Context/Coding-Context/CodingContext-Provider";
import Navigation from "./Navigation";


const GetBM = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const { handleAddBM: handleAddCodingBM } = UseCodingBM();
  const { handleAddBM: handleAddSocialBM } = UseSocialBM();
  const { handleAddBM: handleAddToolsBM } = UseToolsBM();

  const getAddBMFunction = () => {
    switch (path) {
      case "codingbm":
        return handleAddCodingBM;
      case "socialbm":
        return handleAddSocialBM;
      case "toolsbm":
      default:
        return handleAddToolsBM;
    }
  };

  // Redirect to "/bookmarks/Codingbm" if the path is exactly "/bookmarks"
  if (location.pathname === "/bookmarks") {
    return <Navigate to="/bookmarks/Codingbm" />;
  }
  return (
    <>
      <div className="">
        <Navigation/>
      </div>
      <div className="AllBMs-container">
        <div className="AllBMs-wrapper">
          <div className="everything-card">
            <div className="AllBMs-addnewbm-section">
              <AddnewBM handleAddBM={getAddBMFunction()} />
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
