import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {CommonBM, EditBookmark, EditingPannel} from "../../index" ; 
import "../../Bookmarks/Common-Components/Bookmarks.css";

const Bmlist = ({ handleEditBM, handleDeleteBM, BookMark }) => {
  const [editBM, setEditBM] = useState(null);
  const [panelOpenId, setPanelOpenId] = useState(null);

  const panelRef = useRef({});
  const buttonRef = useRef({});

  const togglePanel = (BmId) => {
    setPanelOpenId(panelOpenId === BmId ? null : BmId);
  };

  const openEditPanel = (BmId) => {
    const BMToEdit = BookMark.find((BM) => BM.id === BmId);
    setEditBM(BMToEdit);
    setPanelOpenId(null); // Close the panel when opening the edit form
  };

  const closeEditPanel = () => {
    setEditBM(null); // Close the edit panel by setting editBM to null
  };

  const handleEditSubmit = (BmId, editedText, editedUrl) => {
    handleEditBM(BmId, editedText, editedUrl);
    setEditBM(null); // Reset editBM after submission
  };

  const handleClickOutside = (e) => {
    const panel = panelRef.current[panelOpenId];
    const button = buttonRef.current[panelOpenId];

    if (
      panel &&
      !panel.contains(e.target) &&
      button &&
      !button.contains(e.target)
    ) {
      setPanelOpenId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelOpenId]);

  return (
    <>
      <div className="BMlist-container">
  
        {editBM ? (
          <EditBookmark
            BM={editBM}
            handleEditSubmit={handleEditSubmit}
            handleDeleteBM={handleDeleteBM}
            closeEditPanel={closeEditPanel}
          />
        ) : (
          BookMark.map((BM) => {
            const isPanelOpen = panelOpenId === BM.id;

            return (
              <div key={BM.id} className="group BMlist-bookmark-item">
                <div className="BMlist-bookmark-content">
                  <div className="flex justify-center items-center">
                    <CommonBM BM={BM} />
                  </div>

                  <button
                    className="BMlist-edit-button"
                    onClick={() => togglePanel(BM.id)}
                    ref={(el) => (buttonRef.current[BM.id] = el)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>

                <div>
                  {isPanelOpen && (
                    <EditingPannel
                      BM={BM}
                      panelRef={(el) => (panelRef.current[BM.id] = el)}
                      openEditPanel={openEditPanel}
                      handleDeleteBM={handleDeleteBM}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Bmlist;