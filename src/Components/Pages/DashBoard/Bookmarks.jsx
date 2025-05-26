import React from "react";
import { useBookmarks } from "../../../Context/BookMark-Context/BookMarkContext";
import { useAuth } from "../../../Context/Auth/AuthContext";
import { DemoBookMarks } from "../../../utils/DemoUserData";

const BookMark = () => {
  const { currentUser } = useAuth();
  const { bookmarks } = useBookmarks();

  const codingBookmarks = currentUser 
    ? bookmarks.filter((bm) => bm.category === "coding") 
    : DemoBookMarks;

  const getHighQualityIcon = (url) => {
    try {
      const domain = new URL(url).hostname;
      // Icon.horse provides high-quality, consistent icons
      return `https://icon.horse/icon/${domain}`;
    } catch {
      return null;
    }
  };

  const handleImageError = (e, bookmark) => {
    // Hide image and show letter fallback
    e.target.style.display = 'none';
    const fallback = e.target.parentElement.querySelector('.fallback-icon');
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  const getInitial = (text) => {
    return text.charAt(0).toUpperCase();
  };

  const getColorFromText = (text) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500',
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex justify-center items-center flex-wrap p-2 gap-1">
      {codingBookmarks.map((bookmark) => (
        <div
          className="bg-gray-700 py-2 rounded-full my-1 h-[40px] w-[40px] flex justify-center items-center mx-auto hover:border-blue-300 hover:border-[0.6px] transition-all duration-200 relative"
          key={bookmark.id}
          title={bookmark.text}
        >
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative h-8 w-8 flex items-center justify-center"
          >
            <img
              className="h-8 w-8 rounded"
              src={getHighQualityIcon(bookmark.url)}
              alt={`Icon for ${bookmark.text}`}
              onError={(e) => handleImageError(e, bookmark)}
              loading="lazy"
            />
            <div 
              className={`fallback-icon h-8 w-8 ${getColorFromText(bookmark.text)} rounded flex items-center justify-center text-white font-bold text-sm absolute inset-0`}
              style={{ display: 'none' }}
            >
              {getInitial(bookmark.text)}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookMark;
