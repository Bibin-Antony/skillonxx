import React, { useEffect } from 'react';
import { useDashboard } from '../../assets/dashboard/context/DashboardContext';

const StudentDashboard = () => {
  const { state, actions } = useDashboard();

  // Load data only once when component mounts
  useEffect(() => {
    if (!state.dataLoaded) {  // Add a check to prevent unnecessary loads
      actions.loadDashboardData();
    }
  }, []); // Empty dependency array to run only once

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {state.studentInfo.name}!
          </h1>
          <p className="text-gray-600">{state.studentInfo.university}</p>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Skills</h2>
          <div className="space-y-4">
            {state.skills.items.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-gray-600">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${skill.color} rounded-full h-2`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;