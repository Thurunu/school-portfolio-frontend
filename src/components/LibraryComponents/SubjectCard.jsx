import React from "react";
import { HiOutlineExternalLink } from "react-icons/hi";

const SubjectCard = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full w-full max-w-xs">
      <div className="text-center flex-grow">
        <div className="w-20 h-18 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden">
          <img
            src={book.book_img} 
            className="w-full h-full object-cover"
            alt={book.book_name}
          />
        </div>
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {book.book_name}
        </h3>
      </div>
      <div className="flex justify-center mt-4">
        <a
          href={book.book_download_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium w-full text-center flex items-center justify-center gap-2"
          download
        >
          Download <HiOutlineExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default SubjectCard;
