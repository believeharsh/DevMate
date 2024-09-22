import React from "react";
import { useBM } from "../../../Context/BookMark-Context/BMContext-Provider";

const BookMark = () => {
  const {BookMark} = useBM();
  return (
    <>
      <div className="flex justify-center items-center flex-wrap p-2 gap-1">
        {BookMark.map((BM) => {
          return (
            <div className=" bg-gray-700 py-2 rounded-full my-1 h-[45px] w-[45px] flex justify-center items-center mx-auto hover:border-blue-300 hover:border-[0.6px] " key={BM.id}>
              <a href={BM.url} target="_blank" rel="noopener noreferrer">
                <img
                  className=" h-8 w-8 text-center "
                  src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${BM.url}`
}
                  alt={`Favicon for ${BM.text}`}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "https://via.placeholder.com/32"; // Fallback image
                  }}
                />
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookMark;
