import React from "react";
import SubjectCard from "./SubjectCard";

const SearchResults = ({ results, loading, error, searchTerm }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-secondary">Searching...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Flatten all books from all categories for display
  const allBooks = results.flatMap((item) =>
    item.books
      ? item.books.map((book) => ({
          ...book,
          category: item.category, // Add category info to each book
        }))
      : []
  );

  if (allBooks.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No books found for "{searchTerm}"</p>
        <p className="text-sm text-gray-500 mt-2">Try different search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-primary">
          Search Results ({allBooks.length} books found)
        </h3>
        <span className="text-sm text-primary">for "{searchTerm}"</span>
      </div>

      {/* Group books by category */}
      {results.map((categoryItem, categoryIndex) => {
        if (!categoryItem.books || categoryItem.books.length === 0) return null;

        return (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">
                {categoryItem.category}
              </span>
              <span className="text-sm text-primary">
                {categoryItem.books.length} book
                {categoryItem.books.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
              {categoryItem.books.map((book, bookIndex) => (
                <SubjectCard
                  key={`${categoryIndex}-${bookIndex}`}
                  book={book}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
