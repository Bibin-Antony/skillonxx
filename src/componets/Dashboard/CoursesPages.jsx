import React from 'react';

import { ArrowLeft  } from 'lucide-react'
import { Link } from 'react-router-dom';
const CoursesPages = () => {
  const courses = [
    { id: 1, name: 'Introduction to Computer Science', progress: 75 },
    { id: 2, name: 'Data Structures and Algorithms', progress: 60 },
    { id: 3, name: 'Web Development Fundamentals', progress: 90 },
    { id: 4, name: 'Machine Learning Basics', progress: 40 },
  ];

  return (
    <div className="min-h-screen bg-gray-300 absolute inset-0 p-6 pt-10 space-y-4">
      
      <h2 className="text-2xl pt-16 font-bold text-blue-600 mb-4">Courses</h2>
      <Link
          to="/university-dashboard"
          className="mb-6  inline-flex items-center text-blue-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <div className="bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Progress: {course.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPages;