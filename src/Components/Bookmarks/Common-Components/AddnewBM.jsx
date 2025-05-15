import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./Bookmarks.css";

const AddnewBM = ({ category, handleAddBM }) => {
  const [bookmarkText, setBookmarkText] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookmarkText || !bookmarkUrl) return;

    const newBM = {
      text: bookmarkText,
      url: bookmarkUrl,
      category,
    };

    handleAddBM(newBM);
    setBookmarkText("");
    setBookmarkUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 items-center w-full bg-neutral-900 p-4 rounded-xl shadow-md">
      {/* Input Fields */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <input
          type="text"
          value={bookmarkText}
          onChange={(e) => setBookmarkText(e.target.value)}
          placeholder="Bookmark name"
          className="w-full md:w-1/4 px-5 py-3 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
        />
        <input
          type="url"
          value={bookmarkUrl}
          onChange={(e) => setBookmarkUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full md:w-3/4 px-5 py-3 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400"
        />
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="mt-2 md:mt-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <FaPlus />
        Add
      </button>
    </form>
  );
};

export default AddnewBM;




