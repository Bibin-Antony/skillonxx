import React from 'react';

const ProgressBar = ({ 
  progress, 
  color = "bg-blue-600", 
  backgroundColor = "bg-gray-200",
  height = "h-2" 
}) => {
  return (
    <div className={`w-full ${backgroundColor} rounded-full ${height}`}>
      <div
        className={`${color} rounded-full ${height} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
