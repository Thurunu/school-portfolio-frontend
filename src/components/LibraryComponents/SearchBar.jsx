import React, { useState } from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";

// search bar component responsive for various screen sizes
const SearchBar = ({ onSearch, onClear, isSearching, mobile = false }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Trigger search when query length > 3
    if (value.length > 3) {
      onSearch(value);
    } else if (value.length === 0 && isSearching) { 
      // for clear search when input is empty and we were searching
      onClear();
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    onClear();
  };

  if (mobile) {
    return (
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search books and categories..."
          value={query}
          onChange={handleInputChange}
          className="w-full rounded-full border border-gray-300 px-4 pr-10 py-2 
            focus:outline-none focus:border-secondary bg-white"
        />

        {isSearching && query ? (
          <IoMdClose
            className="text-gray-500 hover:text-red-500 absolute top-1/2 right-3 
              transform -translate-y-1/2 cursor-pointer transition-colors"
            onClick={handleClearSearch}
          />
        ) : (
          <IoMdSearch className="text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="relative group hidden sm:block">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
          className="w-[200px] group-hover:w-[300px] transition-all duration-300 
      rounded-full border border-white/30 px-4 pr-10 py-1 
      focus:outline-none focus:border-secondary"
        />
        {/* Search/Clear Icon */}
        {isSearching && query ? (
          <IoMdClose
            className="text-gray-500 hover:text-red-500 absolute top-1/2 right-3 
            transform -translate-y-1/2 cursor-pointer transition-colors"
            onClick={handleClearSearch}
          />
        ) : (
          <IoMdSearch
            className="text-gray-500 group-hover:text-primary absolute 
          top-1/2 right-3 transform -translate-y-1/2"
          />
        )}{" "}
      </div>
    </div>
  );
};

export default SearchBar;
