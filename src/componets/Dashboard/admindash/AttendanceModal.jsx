import React, { useState, useEffect } from 'react';
import { X, Clock, Check } from 'lucide-react';
import axios from 'axios';

const AttendanceModal = ({ workshop, onClose, token }) => {
  const [duration, setDuration] = useState(30); // default 30 minutes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log(workshop._id)
  const handleCreateAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'https://skillonx-server.onrender.com/university/create-session',
        {
          workshopId: workshop._id,
          date: new Date(),
          duration
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response)
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
        console.log(err)
      setError(err.response?.data?.message || 'Failed to create attendance session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Create Attendance Session</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Workshop
            </label>
            <p className="text-gray-300">{workshop.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              min="1"
              max="120"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-4 h-4" />
              Attendance session created successfully!
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAttendance}
              disabled={loading}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                'Create Session'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;