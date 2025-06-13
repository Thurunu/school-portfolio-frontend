import React, { useState } from "react";
import GradeCard from "../components/LibraryComponents/GradeCard";
import LibraryNavbar from "../components/LibraryComponents/LibraryNavbar";
import SearchResults from "../components/LibraryComponents/SearchResults";
import SearchBar from "../components/LibraryComponents/SearchBar";
import { IoMdClose } from "react-icons/io";

const LibraryPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const handleSearch = async (searchTerm) => {
    if (searchTerm.length <= 3) return; // avoid triggering short searches
    setLoading(true);
    setError(null);
    setCurrentSearchTerm(searchTerm);

    try {
      const response = await fetch(`http://localhost:3000/api/library/search/${searchTerm}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const results = data.data || data;
      setSearchResults(Array.isArray(results) ? results : []);
      setIsSearching(true);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
      setIsSearching(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
    setError(null);
    setCurrentSearchTerm("");
    setLoading(false);
  };

  return (
    <>
      <LibraryNavbar
  searchBar={
    <SearchBar
      onSearch={handleSearch}
      onClear={handleClearSearch}
      isSearching={isSearching}
    />
  }
/>

      <div className="px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-20 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">
            {isSearching ? "Search Results" : "Books"}
          </h2>

          {isSearching && (
            <button
              onClick={handleClearSearch}
              className="flex items-center gap-2 px-4 py-2 bg-primary/50 hover:bg-primary rounded-lg transition-colors text-white"
            >
              <IoMdClose size={16} />
              <span>Close Search</span>
            </button>
          )}
        </div>

        <div className="justify-center">
          {isSearching ? (
            <SearchResults
              results={searchResults}
              loading={loading}
              error={error}
              searchTerm={currentSearchTerm}
            />
          ) : (
            <GradeCard />
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
