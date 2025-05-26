import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const AppContainer = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log("Sidebar collapsed:", !isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden text-white ">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      
      {/* Main Content Area with dynamic width */}
      <div 
        className={`flex flex-col overflow-auto transition-all duration-300 ease-in-out ${
          isSidebarCollapsed 
            ? "ml-16 w-[calc(100%-4rem)]" // 4rem = 64px = w-16
            : "ml-64 w-[calc(100%-16rem)]" // 16rem = 256px = w-64
        }`}
      >
        <div className="flex-1 p-4">
          <Outlet context={{ isSidebarCollapsed, toggleSidebar }} />
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
