import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, Clock, Trash2, Edit, ArrowLeft } from 'lucide-react';
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
    console.log(auth.user);
    fetchWorkshops();
  }, [auth.user]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://skillonx-server.onrender.com/workshops/university/${universityId}`);
      const { data } = await response.json();
      console.log('Fetched workshops:', data);
      setWorkshops(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-900 text-gray-100">
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

                    <div className="flex gap-2">
                      <Link
                        to={`create-assessment/${workshop._id}`}
                        state={{ workshop }}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assessment
                      </Link>
                      
                      
                    </div>
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