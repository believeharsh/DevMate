import React from "react";
import {BmList} from "../../index" ; 
import '../Common-Components/Bookmarks.css'; 
import { UseCodingBM } from "../../../Context/BookMark-Context/Coding-Context/CodingContext-Provider";

const CodingBMs = () => {
  const { handleAddBM, handleDeleteBM, handleEditBM, BookMark } = UseCodingBM();
  return (
    <div className="">
    <div>
      <BmList
        handleAddBM={handleAddBM}
        BookMark={BookMark}
        handleDeleteBM={handleDeleteBM}
        handleEditBM={handleEditBM}
      />
    </div>
  </div>
  );
};

export default CodingBMs ; 