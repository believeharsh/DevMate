import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-14 h-14 border-[5px] border-gray-300 border-t-blue-500 rounded-full animate-spin shadow-lg"></div>
    </div>
  );
};

export default Spinner;