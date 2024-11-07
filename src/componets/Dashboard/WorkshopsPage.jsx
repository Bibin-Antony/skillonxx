import React from 'react';

const WorkshopPage = () => {
  const workshops = [
    { id: 1, name: 'Python for Data Science', date: 'March 15, 2024' },
    { id: 2, name: 'React.js Workshop', date: 'March 22, 2024' },
    { id: 3, name: 'Cloud Computing Essentials', date: 'April 5, 2024' },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Workshops</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workshops.map(workshop => (
          <div key={workshop.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{workshop.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Date: {workshop.date}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default WorkshopPage;
