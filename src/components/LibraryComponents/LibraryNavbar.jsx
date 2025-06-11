import React from "react";
import logo from "../../assets/common/school_logo.png";
import { TEXTS } from "../Constants/text";
import { IoMdSearch } from "react-icons/io";

const LibraryNavbar = () => {
  return (
    <div className="shadow-md bg-white duration-300 realtive z-40">
      <div className="bg-primary py-3 sm_py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a
              href="#"
              className="font-bold text-white text-2xl sm:text-3xl flex gap-2"
            >
              <img src={logo} alt="School Logo" className="w-10" />{" "}
              {TEXTS.SCHOOL_NAME}
            </a>
          </div>
          {/* search bar */}
          <div>
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 
      rounded-full border border-gray-300 px-4 pr-10 py-1 
      focus:outline-none focus:border-secondary"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 right-3 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryNavbar;
