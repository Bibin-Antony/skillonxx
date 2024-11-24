import React, { useState, useEffect } from 'react';
import { Clock, Check, X, Eye, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AdminCourseRequests = () => {
  const [courseRequests, setCourseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseRequests();
  }, []);

  const fetchCourseRequests = async () => {
    try {
      const response = await axios.get('https://skillonx-server.onrender.com/course-requests/pending', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log(response.data)
      setCourseRequests(response.data.data);
    } catch (err) {
      setError('Failed to fetch course requests');
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const response = await axios.put(`https://skillonx-server.onrender.com/course-requests/${requestId}/status`, {
        status,
        adminComment: status === 'approved' ? 'Course request approved' : 'Course request rejected'
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log("accepted", response.data)
      // Refresh requests list
      fetchCourseRequests();
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Course Requests</h2>
          {courseRequests.length > 0 && (
            <span className="bg-teal-500/10 text-teal-500 px-2 py-1 rounded-full text-sm">
              {courseRequests.length} pending
            </span>
          )}
        </div>
      </div>

      {courseRequests.length === 0 ? (
        <div className="text-center py-8 bg-gray-700/50 rounded-lg">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">No pending course requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courseRequests.map((request) => (
            <div
              key={request._id}
              className="bg-gray-700/50 p-4 rounded-lg border border-gray-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg mb-1">
                    {request.courseDetails.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Student: {request.studentId.firstName || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Requested: {new Date(request.requestDate).toLocaleDateString()}
                  </p>

                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(request._id, 'approved')}
                    className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-500 p-2 rounded-lg transition-colors"
                    title="Approve"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request._id, 'rejected')}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
                    title="Reject"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Course Details:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <span className="block text-gray-500">Category:</span>
                    {request.courseDetails.category}
                  </div>
                  <div>
                    <span className="block text-gray-500">Duration:</span>
                    {request.courseDetails.duration}
                  </div>
                  <div>
                    <span className="block text-gray-500">Mode:</span>
                    {request.courseDetails.mode}
                  </div>
                  <div>
                    <span className="block text-gray-500">Internship:</span>
                    {request.courseDetails.hasInternship ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCourseRequests;