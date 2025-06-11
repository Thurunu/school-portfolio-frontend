import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLibraryOutline } from "react-icons/io5";

const LibraryButton = ({ isMobile = false }) => {
  const navigate = useNavigate();

  const handleLibraryClick = () => {
    console.log("Library button clicked");
    navigate("/library");
  };

  return (
    <button
      className={`bg-transparent hover:bg-secondary text-white font-semibold hover:text-primary 
        py-2 px-4 border border-secondary hover:border-transparent rounded flex items-center gap-2 
        ${isMobile ? "w-full justify-center mt-4" : ""}`}
      onClick={handleLibraryClick}
    >
      <IoLibraryOutline className="text-xl" />
      Library
    </button>
  );
};

export default LibraryButton;