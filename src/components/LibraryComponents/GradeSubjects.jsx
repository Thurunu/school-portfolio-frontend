import React, { useEffect, useState } from "react";
import axios from "axios";

const GradeSubjects = ({ gradeData, onBack }) => {
  const [gradeBooks, setGradeBooks] = useState(null);

  useEffect(() => {
    const fetchGradeBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/library/${gradeData.category_id}/books`
        );
        setGradeBooks(response.data);
        console.log("Grade Books:", response.data);
      } catch (error) {
        console.error("Error fetching grade books:", error);
      }
    };
    fetchGradeBooks();
  }, [gradeData.grade_id]);

  if (!gradeBooks) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="section px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {gradeData.grade} Subjects
          </h2>
          <button
            onClick={onBack}
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            ← Back to Grades
          </button>
        </div>

        {/* Subject Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center max-w-fit">
            {gradeBooks.map((book) => (
              <div
                key={book.book_id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full w-full max-w-xs"
              >
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
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium w-full text-center block"
                    download
                  >
                    Download ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600 text-center">
            <span className="font-semibold">{gradeBooks.length}</span> subjects
            available for {gradeData.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradeSubjects;
