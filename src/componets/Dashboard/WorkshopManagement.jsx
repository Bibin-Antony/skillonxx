import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, Clock, Trash2, Edit,ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const WorkshopManagement = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const universityId = auth.user._id;

  useEffect(() => {
    console.log(auth.user)
    fetchWorkshops();
  }, [auth.user]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/workshops/university/${universityId}`);
      const { data } = await response.json();
      console.log('Fetched workshops:', data);
      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDeleteWorkshop = async (workshopId) => {
  //   if (window.confirm('Are you sure you want to delete this workshop?')) {
  //     try {
  //       const response = await fetch(`http://localhost:5000/workshops/delete/${workshopId}`, {
  //         method: 'DELETE'
  //       });
  //       if (response.ok) {
  //         setWorkshops(workshops.filter(workshop => workshop._id !== workshopId));
  //       }
  //     } catch (error) {
  //       console.error('Error deleting workshop:', error);
  //     }
  //   }
  // };

  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-300">
      {/* Back Button */}
      <Link
          to="/university-dashboard"
          className="mb-6 pl-24 inline-flex items-center text-blue-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Workshop Management</h1>
            <p className="text-gray-600 mt-1">Manage your university's workshops</p>
          </div>
          <Link
            to="create-workshop"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workshop
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Active Workshops</h2>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : workshops.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No workshops added yet.</p>
              <Link
                to="create-workshop"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {workshop.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={workshop.image}
                        alt={workshop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{workshop.title}</h3>
                      <span className="inline-block px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-full mt-1">
                        {workshop.category}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {workshop.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {workshop.batchSize}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {workshop.mode}
                      </div>
                    </div>

                    {workshop.highlights && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workshop.highlights.map((highlight, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

          <Link
            to={`create-assessment/${workshop._id}`}
            state={{ workshop }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
          </Link>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopManagement;