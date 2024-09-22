import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useBM } from "../../Context/BookMark-Context/BMContext-Provider";
import { v4 as uuidv4 } from "uuid";
import './Bookmarks.css'; // Import the CSS file

const AddnewBM = () => {
  const { handleAddBM, BookMark } = useBM();
  const [bookmarkText, setBookmarkText] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBM(BookMark, {
      id: uuidv4(),
      text: bookmarkText,
      url: bookmarkUrl,
    });

    setBookmarkText("");
    setBookmarkUrl("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="AddnewBM-addbm-form">
        {/* First Child: Input Fields */}
        <div className="AddnewBM-input-container">
          {/* Bookmark Text (25% width) */}
          <div className="AddnewBM-bookmark-text">
            <input
              type="text"
              value={bookmarkText}
              onChange={(e) => setBookmarkText(e.target.value)}
              placeholder="Name"
              className="AddnewBM-input-field"
            />
          </div>

          {/* Bookmark URL (75% width) */}
          <div className="AddnewBM-bookmark-url">
            <input
              type="url"
              value={bookmarkUrl}
              onChange={(e) => setBookmarkUrl(e.target.value)}
              placeholder="URL"
              className="AddnewBM-input-field"
            />
          </div>
        </div>

        {/* Second Child: Add Button (10% width) */}
        <div className="AddnewBM-add-button-container" style={{ width: "10%" }}>
          <button type="submit" className="AddnewBM-add-button">
            <FaPlus />
          </button>
        </div>
      </form>
    </>
  );
};

export default AddnewBM;