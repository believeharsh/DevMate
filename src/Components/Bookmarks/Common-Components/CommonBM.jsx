import React from "react";
import "./Bookmarks.css"; // Import the CSS file

const CommonBM = ({ BM }) => {
  // Construct the favicon URL

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${BM.url}`;


  return (
    <div className="commonBM-container">
      <div className="commonBM-favicon-container">
        <a href={BM.url} target="_blank" rel="noopener noreferrer">
         
          <img
            className="commonBM-favicon-image"
            src={faviconUrl}
            alt={`Favicon for ${BM.text}`}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://via.placeholder.com/32"; // Fallback image
            }}
          />
        </a>
      </div>

      <p className="commonBM-bookmark-text">{BM.text}</p>
    </div>
  );
};

export default CommonBM;
