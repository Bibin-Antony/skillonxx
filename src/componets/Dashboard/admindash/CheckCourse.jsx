import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, User, Calendar, BookOpen, Check, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckCourse = () => {
  const [studentsWithAccess, setStudentsWithAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudentsWithAccess();
  }, []);

  const fetchStudentsWithAccess = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        "https://skillonx-server.onrender.com/admin/students-with-access",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStudentsWithAccess(response.data.students);
      setError(null);
    } catch (err) {
      setError("Failed to fetch students with course access. Please try again later.");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourseAccess = async (studentId, courseRequestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://skillonx-server.onrender.com/admin/course-access/${studentId}/${courseRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setStudentsWithAccess(prevStudents => {
        return prevStudents.map(student => {
          if (student._id === studentId) {
            const updatedCourses = student.courses.filter(course => course._id !== courseRequestId);
            if (updatedCourses.length === 0) {
              return null;
            }
            return { ...student, courses: updatedCourses };
          }
          return student;
        }).filter(Boolean);
      });
    } catch (err) {
      setError("Failed to delete course access. Please try again later.");
      console.error("Error deleting course access:", err);
    }
  };

  const filteredStudents = studentsWithAccess.filter(student => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.universityName?.toLowerCase().includes(searchLower)
    );
  });

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mb-4" />
      <p className="text-gray-400">Loading students with course access...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button
          onClick={fetchStudentsWithAccess}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-900 p-6">
      <Link
        to="/admin"
        className="mb-6 pl-24 inline-flex items-center text-cyan-600 hover:text-cyan-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Students with Course Access</h1>
            <p className="text-gray-400 mt-2">Showing all students who currently have access to courses</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={student._id}
                className="bg-gray-800 rounded-lg p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideIn 0.5s ease-out forwards'
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {`${student.firstName} ${student.lastName}`}
                      </h3>
                      <p className="text-gray-400">{student.universityName}</p>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                      <Check className="w-4 h-4 mr-1" />
                      Active Access
                    </span>
                  </div>
                </div>

                <div className="mt-4 pl-16">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Accessible Courses</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {student.courses.map((course, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-700/50 px-3 py-2 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-teal-500" />
                          <span className="text-white text-sm">{course.title}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteCourseAccess(student._id, course._id)}
                          className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-red-400"
                          title="Remove course access"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No students found with course access</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CheckCourse;