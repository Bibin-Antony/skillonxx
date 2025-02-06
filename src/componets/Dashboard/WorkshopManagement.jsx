import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, Clock, Trash2, Edit, ArrowLeft, FileText, X, Icon, CheckCircle2,AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-emerald-900/90' : 'bg-red-900/90';
  const borderColor = type === 'success' ? 'border-emerald-500' : 'border-red-500';
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className="fixed top-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
      <div className={`${bgColor} border ${borderColor} rounded-lg shadow-lg p-4 text-white max-w-md backdrop-blur-sm`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon size={18} className={type === 'success' ? 'text-emerald-400' : 'text-red-400'} />
            <p className="text-sm flex-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
const WorkshopManagement = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [materialFile, setMaterialFile] = useState(null);
  const [materialTitle, setMaterialTitle] = useState('');
  const universityId = auth.user._id;
  const [notification, setNotification] = useState(null);
  const [updatingAttendance, setUpdatingAttendance] = useState(null);

  // Add styles for the animation
  const notificationStyles = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  const devUrl = 'http://localhost:5000'
  const prodUrl ='https://skillonx-server.onrender.com'

  useEffect(() => {
    // console.log(auth.user);
    fetchWorkshops();
  }, [auth.user]);
  const showNotification = (type, message) => {
    setNotification({ type, message });
    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };
  const handleAttendanceToggle = async (workshopId, currentStatus) => {
    try {
      setUpdatingAttendance(workshopId);
      const response = await fetch(`${prodUrl}/workshops/${workshopId}/toggle-attendance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAttendance: !currentStatus }),
      });

      if (response.ok) {
        // Update the workshops state to reflect the change
        setWorkshops(workshops.map(workshop => 
          workshop._id === workshopId 
            ? { ...workshop, isAttendance: !workshop.isAttendance }
            : workshop
        ));
        showNotification('success', `Attendance ${!currentStatus ? 'started' : 'ended'} successfully!`);
      } else {
        showNotification('error', 'Failed to update attendance status');
      }
    } catch (error) {
      console.error('Error toggling attendance:', error);
      showNotification('error', 'Failed to update attendance status');
    } finally {
      setUpdatingAttendance(null);
    }
  };
  
  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${prodUrl}/workshops/university/${universityId}`);
      const { data } = await response.json();
      // console.log('Fetched workshops:', data);
      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsAddMaterialOpen(true);
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();

    if (!materialFile || !materialTitle) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', materialFile);
      formData.append('title', materialTitle);
      formData.append('workshopId', selectedWorkshop._id);
      formData.append('universityId', auth.user._id);

      console.log('Sending material:', {
        title: materialTitle,
        fileName: materialFile.name,
        workshopId: selectedWorkshop._id,
        universityId: auth.user._id
      });

      // console.log(formData)
      const response = await fetch('https://skillonx-server.onrender.com/workshops/materials', {
        method: 'POST',

        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        await fetchWorkshops();
        setMaterialFile(null);
        setMaterialTitle('');
        setIsAddMaterialOpen(false);
        showNotification('success', 'Material uploaded successfully!');
      } else {
        showNotification('error', result.message || 'Failed to upload material');
      }
    } catch (error) {
      showNotification('error', 'Failed to upload material. Please try again.');

    }
  };

  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-900 text-gray-100">

      <style>{notificationStyles}</style>

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Back Button */}
      <Link
        to="/university-dashboard"
        className="mb-6 pl-24 inline-flex items-center text-teal-500 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Workshop Management</h1>
            <p className="text-gray-400 mt-1">Manage your university's workshops</p>
          </div>
          <Link
            to="create-workshop"
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workshop
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Your Active Workshops</h2>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : workshops.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
              <p className="text-gray-400 mb-4">No workshops added yet.</p>
              <Link
                to="create-workshop"
                className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Workshop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <div
                  key={workshop._id}
                  className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-all"
                >
                  {workshop.image && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={workshop.image}
                        alt={workshop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-100">{workshop.title}</h3>
                      <span className="inline-block px-2 py-1 text-sm text-teal-400 bg-teal-900/50 rounded-full mt-1">
                        {workshop.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">
                      {workshop.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-teal-500" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-teal-500" />
                        {workshop.batchSize}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                        {workshop.mode}
                      </div>
                    </div>

                    {workshop.highlights && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workshop.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Link
                        to={`create-assessment/${workshop._id}`}
                        state={{ workshop }}
                        className="inline-flex items-center justify-center px-3 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Assessment
                      </Link>
                      <button
                        onClick={() => handleAddMaterial(workshop)}
                        className="inline-flex items-center justify-center px-3 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Materials
                      </button>
                      <button
                      onClick={() => handleAttendanceToggle(workshop._id, workshop.isAttendance)}
                      disabled={updatingAttendance === workshop._id}
                      className={`inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors ${
                        workshop.isAttendance 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-teal-500 hover:bg-teal-600'
                      } text-white`}
                    >
                      {updatingAttendance === workshop._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                      ) : (
                        <Users className="w-4 h-4 mr-1" />
                      )}
                      {workshop.isAttendance ? 'End' : 'Start'}
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Material Modal */}
      {isAddMaterialOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-100">Add Workshop Materials</h3>
              <button
                onClick={() => setIsAddMaterialOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMaterialSubmit} className="space-y-4">
              <div>
                <label htmlFor="materialTitle" className="block text-sm font-medium text-gray-200 mb-1">
                  Material Title
                </label>
                <input
                  id="materialTitle"
                  type="text"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter material title"
                  required
                />
              </div>

              <div>
                <label htmlFor="materialFile" className="block text-sm font-medium text-gray-200 mb-1">
                  Upload File (PDF, DOC, etc.)
                </label>
                <input
                  id="materialFile"
                  type="file"
                  onChange={(e) => setMaterialFile(e.target.files[0])}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddMaterialOpen(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopManagement;