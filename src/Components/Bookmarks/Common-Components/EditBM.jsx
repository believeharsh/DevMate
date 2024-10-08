import React, { useState, useEffect } from "react";
import './Bookmarks.css'; // Import the CSS file

const EditBookmark = ({ BM, handleEditSubmit, handleDeleteBM, closeEditPanel }) => {
  const [editedText, setEditedText] = useState(BM.text);
  const [editedUrl, setEditedUrl] = useState(BM.url);

  useEffect(() => {
    setEditedText(BM.text);
    setEditedUrl(BM.url);
  }, [BM]);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleUrlChange = (e) => {
    setEditedUrl(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim() === "" || editedUrl.trim() === "") {
      alert("Both text and URL cannot be empty");
      return;
    }
    handleEditSubmit(BM.id, editedText, editedUrl);
    closeEditPanel(); // Close the edit panel after submitting
  };

  return (
    <div className="p-4  text-white bg-transparent w-full">
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label className="EditingPanleLabels">Text:</label>
        <input
          type="text"
          value={editedText}
          onChange={handleTextChange}
          className="EditingPanelInputs"
        />
      </div>
      <div className="mb-2">
        <label className="EditingPanleLabels">URL:</label>
        <input
          type="text"
          value={editedUrl}
          onChange={handleUrlChange}
          className="EditingPanelInputs"
        />
      </div>
      <div className="flex justify-end gap-1">
        <button
          type="submit"
          className="EditingBM-Btn"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => handleDeleteBM(BM.id, category)}
          className="EditingBM-Btn"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={closeEditPanel}
          className="EditingBM-Btn"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditBookmark;
