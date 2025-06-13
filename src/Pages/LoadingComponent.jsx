import React from "react";

const Loading = ({ 
  message = "Loading...", 
  size = "medium", 
  color = "primary",
  minHeight = "400px",
  showMessage = true 
}) => {
  // Size configurations
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-12 h-12 border-4",
    large: "w-16 h-16 border-4"
  };

  // Color configurations
  const colorClasses = {
    primary: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    blue: "border-blue-500 border-t-transparent",
    green: "border-green-500 border-t-transparent",
    red: "border-red-500 border-t-transparent",
    gray: "border-gray-500 border-t-transparent"
  };

  const textSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base"
  };

  // Get the classes safely
  const spinnerSizeClass = sizeClasses[size] || sizeClasses.medium;
  const spinnerColorClass = colorClasses[color] || colorClasses.primary;
  const textSizeClass = textSizeClasses[size] || textSizeClasses.medium;

  return (
    <div 
      className="flex justify-center items-center w-full" 
      style={{ minHeight }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinning loader */}
        <div 
          className={`${spinnerSizeClass} ${spinnerColorClass} rounded-full animate-spin`}
        ></div>
        
        {/* Loading message */}
        {showMessage && (
          <p className={`text-gray-600 text-center ${textSizeClass}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;