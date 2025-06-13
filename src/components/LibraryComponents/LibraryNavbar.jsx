import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Header from "../NavBar/Header";

const LibraryNavbar = ({searchBar}) => {

  return (
    <div className="bg-primary py-3 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Header />
      {/* search bar */}
      <div className="flex items-center gap-8">
        {searchBar}
      </div>
      
      </div>
    </div>
  );
};

export default LibraryNavbar;
