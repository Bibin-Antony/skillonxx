import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
    </div>
  </div>
);


export default LoadingSpinner;