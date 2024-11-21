import React, { useEffect, useState } from 'react';
import { Search, User, GraduationCap, Mail, Calendar, Phone, Eye, Edit, Trash, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array to fetch only once

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token')
      const response = await axios.get(
        "https://skillonx-server.onrender.com/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data.students)
      setStudents(response.data.students);
      setError(null);
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    return (
      (student?.firstName?.toLowerCase()?.includes(searchLower) || false) ||
      (student?.lastName?.toLowerCase()?.includes(searchLower) || false) ||
      (student?.email?.toLowerCase()?.includes(searchLower) || false) ||
      (student?.universityName?.toLowerCase()?.includes(searchLower) || false) ||
      (student?.currentEducation?.toLowerCase()?.includes(searchLower) || false)
    );
  });

  // Loading State Component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mb-4" />
      <p className="text-gray-400">Loading students...</p>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button
          onClick={fetchStudents}
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
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Students</h1>
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

        {/* Students List */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={student._id}
                className="bg-gray-800 rounded-lg p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideIn 0.5s ease-out forwards'
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors duration-300">
                      <User className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                        {`${student.firstName} ${student.lastName}`}
                      </h3>
                      <p className="text-gray-400">{student.universityName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-16 md:ml-0">
                    <Link
                      to={`/admin/students/${student._id}`}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      to={`/admin/students/${student._id}/edit`}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-red-400"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pl-16">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{student.currentEducation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Passing Year: {student.passingYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Gender: {student.gender}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No students found</p>
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

export default AdminStudents;