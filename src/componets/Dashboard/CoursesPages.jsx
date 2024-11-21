import React, { useState, useEffect } from 'react';
import { ArrowLeft, PlusCircle, Book, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const CoursesPages = () => {
  const [courseRequests, setCourseRequests] = useState({
    pending: [],
    approved: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = auth.user._id
    console.log(studentId)
    const token = localStorage.getItem('token')
    // console.log(token)
    const fetchCourseRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://skillonx-server.onrender.com/course-requests/student-requests/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Course requests:', response.data);
        setCourseRequests(response.data.data);
      } catch (error) {
        console.error('Error fetching course requests:', error);
        setError(error.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseRequests();
  }, [auth.user._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-100">My Courses</h1>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-300 hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back to Dashboard</span>
          </button>

          <Link
            to='/student-dashboard/courses-page/add-course'
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            Add Course
          </Link>
        </div>

        {/* Pending Courses Section */}
        {courseRequests.pending.length > 0 && (
          <div className="mb-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <p className="text-yellow-400 text-sm">
                Your course applications are being reviewed. We'll notify you once they're approved.
              </p>
            </div>

            <h2 className="text-lg font-semibold mb-4 text-gray-200">Pending Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseRequests.pending.map((request) => (
                <div
                  key={request._id}
                  className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Pending</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-300">{request.courseDetails.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Applied: {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Courses Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Active Courses</h2>
          {courseRequests.approved.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="flex justify-center mb-4">
                <Book className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-100 mb-2">No active courses yet</h3>
              <p className="text-sm text-gray-400">Start by requesting a course</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseRequests.approved.map((request) => (
                <div
                  key={request._id}
                  className="bg-gray-800 rounded-lg p-6 border border-teal-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-100">{request.courseDetails.title}</h3>
                    <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{request.courseDetails.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Approved: {new Date(request.approvalDate).toLocaleDateString()}
                    </span>
                    <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
                      Start Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rejected Courses Section */}
        {courseRequests.rejected.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Rejected Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseRequests.rejected.map((request) => (
                <div
                  key={request._id}
                  className="bg-gray-800 rounded-lg p-6 border border-red-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-100">{request.courseDetails.title}</h3>
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </span>
                  </div>
                  {request.adminComment && (
                    <div className="mt-2 text-sm text-gray-400 bg-red-500/10 p-3 rounded-lg">
                      {request.adminComment}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CoursesPages;