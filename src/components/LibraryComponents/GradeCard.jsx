import React, { useState, useEffect } from "react";
import axios from "axios";
import GradeSubjects from "./GradeSubjects";

const GradeCard = () => {
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/library/");
        setGrades(response.data); // ✅ use `grades` state
        console.log("Fetched Grades:", response);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };
    fetchGrades();
  }, []);

  const handleGradeClick = (gradeData) => {
    setSelectedGrade(gradeData);
  };

  const handleBackToGrades = () => {
    setSelectedGrade(null);
  };

  // If a grade is selected, show the GradeSubjects component
  if (selectedGrade) {
    return (
      <GradeSubjects gradeData={selectedGrade} onBack={handleBackToGrades} />
    );
  }

  return (
    <section className="section px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {grades.map((gradeData) => (
          <div
            key={gradeData.category_id}
            className="relative bg-primary/15 border rounded-2xl shadow p-6 hover:shadow-lg hover:bg-secondary/80 transition-all duration-300 cursor-pointer group min-h-[140px] flex items-center justify-center overflow-hidden"
            onClick={() => {
              console.log(`Clicked on ${gradeData.category}`);
              handleGradeClick(gradeData);
            }}
          >
            {/* Main grade text */}
            <h3 className="text-2xl font-bold text-center z-10 relative">
              {gradeData.category}
            </h3>

            {/* Watermark text that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none">
              <span className="text-9xl font-bold text-primary select-none">
                {gradeData.category_id}
              </span>
            </div>

            {/* Subject count badge  */}

            <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {gradeData.book_count} books
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GradeCard;
