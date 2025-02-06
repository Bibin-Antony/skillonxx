import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Check,
  X,
  Building,
  Mail,
  MapPin,
  Award
} from 'lucide-react';

const UniversityApprovals = () => {
  const [pendingUniversities, setPendingUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingUniversities();
  }, []);

  const fetchPendingUniversities = async () => {
    try {
      const response = await axios.get('https://skillonx-server.onrender.com/admin/pending-universities', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response)
      setPendingUniversities(response.data.universities);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });      
     setError('Failed to fetch pending universities');

      setLoading(false);
    }
  };

  const handleApproval = async (universityId, isApproved) => {
    try {
      const response = await axios.patch(
        `https://skillonx-server.onrender.com/admin/university-approval/${universityId}`,
        {
          isApproved,
          remarks: isApproved ? 'University approved' : 'University application rejected'
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        // Remove the approved/rejected university from the list
        setPendingUniversities(prevUniversities => 
          prevUniversities.filter(uni => uni._id !== universityId)
        );
      }
    } catch (err) {
      console.error('Error updating university approval:', err);
      setError('Failed to update university approval status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/20 text-red-400 rounded-lg">
        {error}
      </div>
    );
  }

  if (pendingUniversities.length === 0) {
    return null; // Don't show anything if there are no pending universities
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Pending University Approvals</h2>
      <div className="space-y-4">
        {pendingUniversities.map((university) => (
          <div key={university._id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-teal-500" />
                  <h3 className="font-medium text-lg">{university.universityName}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{university.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{university.universityAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Award className="w-4 h-4" />
                  <span>Recognized by: {university.recognizedBy}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApproval(university._id, true)}
                  className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleApproval(university._id, false)}
                  className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityApprovals;