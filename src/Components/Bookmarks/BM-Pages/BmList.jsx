import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CommonBM, EditBookmark, EditingPannel } from "../../index";
import { useBookmarks } from "../../../Context/BookMark-Context/BookMarkContext";
import "../../Bookmarks/Common-Components/Bookmarks.css";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { DemoBookMarks } from "../../../utils/DemoUserData";


const Bmlist = ({ category }) => {
  const {currentUser} = useAuth() ; 
  const [editBM, setEditBM] = useState(null);
  const [panelOpenId, setPanelOpenId] = useState(null);
  const { bookmarks, updateBookmark, deleteBookmark } = useBookmarks();
  // Filter bookmarks by category
  const filteredBookmarks = currentUser ? bookmarks.filter((BM) => BM.category === category) : DemoBookMarks


  const panelRef = useRef({});
  const buttonRef = useRef({});

  const togglePanel = (BmId) => {
    setPanelOpenId(panelOpenId === BmId ? null : BmId);
  };

  const openEditPanel = (BmId) => {
    const BMToEdit = filteredBookmarks.find((BM) => BM.id === BmId);
    setEditBM(BMToEdit);
    setPanelOpenId(null);
  };

  const closeEditPanel = () => {
    setEditBM(null);
  };

  const handleEditSubmit = async (BmId, editedText, editedUrl) => {
    await updateBookmark(BmId, {
      text: editedText, 
      url: editedUrl,
    });
    setEditBM(null);
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
    <div className="BMlist-container">
      {editBM ? (
        <EditBookmark
          BM={editBM}
          handleEditSubmit={handleEditSubmit}
          handleDeleteBM={deleteBookmark}
          closeEditPanel={closeEditPanel}
        />
      ) : (
        filteredBookmarks.map((BM) => {
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

              {isPanelOpen && (
                <EditingPannel
                  BM={BM}
                  panelRef={(el) => (panelRef.current[BM.id] = el)}
                  openEditPanel={openEditPanel}
                  handleDeleteBM={deleteBookmark}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Bmlist;

