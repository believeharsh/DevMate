import React from "react";
import AddnewBM from "../Common-Components/AddnewBM";
import {BmList} from "../../index.js" ; 
import '../Common-Components/Bookmarks.css'; 
import { UseToolsBM } from "../../../Context/BookMark-Context/Tools-Context/ToolsContext-Provider";

const ToolsBMs = () => {
  const { handleAddBM, handleDeleteBM, handleEditBM, BookMark } = UseToolsBM();
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

export default ToolsBMs ; 