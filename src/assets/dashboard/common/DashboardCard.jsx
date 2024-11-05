import React from 'react';

const DashboardCard = ({ 
  title, 
  children, 
  onViewAll, 
  viewAllText = "View All",
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {viewAllText}
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardCard;