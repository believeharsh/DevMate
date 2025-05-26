import React from "react";
import "./Bookmarks.css";

const CommonBM = ({ BM }) => {
  // Get domain from URL
  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  // Multiple favicon services for better reliability
  const getFaviconUrl = (url) => {
    const domain = getDomain(url);
    return `https://icon.horse/icon/${domain}`;
  };

  const handleImageError = (e) => {
    const domain = getDomain(BM.url);
    const currentSrc = e.target.src;
    
    // Try different services in sequence
    if (currentSrc.includes('icon.horse')) {
      e.target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } else if (currentSrc.includes('google.com/s2/favicons')) {
      e.target.src = `https://favicons.githubusercontent.com/${domain}`;
    } else if (currentSrc.includes('githubusercontent.com')) {
      e.target.src = `https://api.faviconkit.com/${domain}/32`;
    } else if (currentSrc.includes('faviconkit.com')) {
      e.target.src = `https://${domain}/favicon.ico`;
    } else {
      // Final fallback - hide image and show letter
      e.target.style.display = 'none';
      const fallback = e.target.parentElement.querySelector('.fallback-icon');
      if (fallback) {
        fallback.style.display = 'flex';
      }
    }
  };

  const getInitial = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const getColorFromText = (text) => {
    const colors = [
      '#3B82F6', '#10B981', '#8B5CF6', '#EF4444',
      '#F59E0B', '#6366F1', '#EC4899', '#14B8A6'
    ];
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="commonBM-container">
      <div className="commonBM-favicon-container">
        <a href={BM.url} target="_blank" rel="noopener noreferrer">
          <img
            className="commonBM-favicon-image"
            src={getFaviconUrl(BM.url)}
            alt={`Favicon for ${BM.text}`}
            onError={handleImageError}
            // loading="lazy"
          />
          <div 
            className="fallback-icon"
            style={{ 
              display: 'none',
              width: '32px',
              height: '32px',
              backgroundColor: getColorFromText(BM.text),
              borderRadius: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {getInitial(BM.text)}
          </div>
        </a>
      </div>
      <p className="commonBM-bookmark-text">{BM.text}</p>
    </div>
  );
};

export default CommonBM;



