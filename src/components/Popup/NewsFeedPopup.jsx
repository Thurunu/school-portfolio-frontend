import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import testImg from "../../assets/banners/banner_img_1.jpg"; 
import NewsFeed from "../../Pages/NewsFeedPage";


const NewsFeedPopup = ({ newsPopup, setNewsPopup, selectedNews }) => {
  return (
    <>
      {newsPopup && (
        <div className="popup">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed inset-0 m-[100px] bg-white p-6 rounded-md shadow-lg z-50 w-[calc(100vw-200px)] h-[calc(100vh-200px)] overflow-auto">
              {/* news title  */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-black">
                  {selectedNews.title}
                </h1>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => setNewsPopup(false)}
                />
              </div>
              
              {/* Content Section with Image and Text */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* images */}
                {selectedNews.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={selectedNews.image}
                      // src={testImg}
                      alt={selectedNews.title}
                      className="w-full max-w-[400px] h-[350px] object-cover drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
                    />
                  </div>
                )}
                
                {/* news body  */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 tracking-wide leading-6">
                    {selectedNews.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsFeedPopup;
