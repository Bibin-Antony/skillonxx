import React from 'react';

const AssessmentPage = () => {
  const tests = [
    { id: 1, name: 'Midterm Exam: Computer Networks', date: 'March 20, 2024' },
    { id: 2, name: 'Final Project Presentation: Web Development', date: 'April 10, 2024' },
    { id: 3, name: 'Quiz: Database Management Systems', date: 'March 25, 2024' },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map(test => (
          <div key={test.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{test.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Date: {test.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentPage;
