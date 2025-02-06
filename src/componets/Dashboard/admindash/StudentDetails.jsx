import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, GraduationCap, Mail, Calendar, Phone, BookOpen, CheckCircle, Clock, Award } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
    console.log(studentId)
  }, [studentId]);

  const fetchStudentDetails = async () => {
    const devUrl = 'http://localhost:5000'
    const prodUrl = 'https://skillonx-server.onrender.com'
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${prodUrl}/admin/students/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setStudent(response.data.student);
      setError(null);
    } catch (err) {
      setError("Failed to fetch student details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mb-4" />
      <p className="text-gray-400">Loading student details...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button
          onClick={fetchStudentDetails}
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
        to="/admin/students"
        className="mb-6 pl-24 inline-flex items-center text-cyan-600 hover:text-cyan-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Students
      </Link>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : student ? (
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl animate-fadeIn">
            {/* Header Section */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-teal-500/20 rounded-lg flex items-center justify-center">
                <User className="w-10 h-10 text-teal-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {`${student.firstName} ${student.lastName}`}
                </h1>
                <p className="text-xl text-gray-400">{student.universityName}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Gender</p>
                    <p className="text-white">{student.gender}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Academic Information</h2>

                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Current Education</p>
                    <p className="text-white">{student.currentEducation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Passing Year</p>
                    <p className="text-white">{student.passingYear}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Workshops Enrolled</p>
                    <p className="text-white">{student.workshops ? student.workshops.length : 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshops Section */}
            {student.workshops && student.workshops.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">Enrolled Workshops</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.workshops.map((workshop, index) => (
                    <div 
                      key={index}
                      className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <p className="text-white font-medium">{workshop.title || 'Workshop Title'}</p>
                      <p className="text-gray-400 text-sm mt-1">{workshop.status || 'Status'}</p>
                      {workshop.startDate && workshop.endDate && (
                        <p className="text-gray-400 text-sm mt-1">
                          {new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Results Section */}
            {student.assessmentResults && student.assessmentResults.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">Assessment Results</h2>
                <div className="grid grid-cols-1 gap-4">
                  {student.assessmentResults.map((result, index) => (
                    <div 
                      key={index}
                      className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">
                          {result.assessmentId?.title || 'Assessment'}
                        </p>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          result.status === 'submitted' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {result.status === 'submitted' ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Submitted</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Pending</span>
                            </div>
                          )}
                        </span>
                      </div>
                      
                      {result.status === 'submitted' && result.score && (
                        <div className="mt-2 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Score</p>
                            <p className="text-white">{result.score.obtainedMarks}/{result.score.totalMarks}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Percentage</p>
                            <p className="text-white">{result.score.percentage}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Submitted On</p>
                            <p className="text-white">{new Date(result.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Requests Section */}
            {student.courseRequest && student.courseRequest.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4">Course Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.courseRequest.map((course, index) => (
                    <div 
                      key={index}
                      className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{course.title}</p>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          course.status === 'approved' 
                            ? 'bg-green-500/20 text-green-400'
                            : course.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Student not found</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StudentDetails;