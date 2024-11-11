import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react';

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const stuId=  auth.user._id
  console.log(stuId)
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        // Send user information directly in the request
        const response = await fetch(`http://localhost:5000/workshops/get-workshops/${stuId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          // Including credentials to handle cookies
          credentials: 'include'
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }

        const data = await response.json();
        setWorkshops(data.workshops);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError(err.message);
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (auth.user) {
      fetchWorkshops();
    }
  }, [auth.user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Workshops</h1>
        <p className="mt-2 text-gray-600">
          Explore workshops offered by {auth.user?.universityName}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div 
            key={workshop._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Workshop Image/Banner */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-600">
                  {workshop.category}
                </span>
              </div>
            </div>

            {/* Workshop Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {workshop.title}
              </h3>

              {/* Workshop Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                  <span>{new Date(workshop.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-blue-500" />
                  <span>{workshop.duration}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-blue-500" />
                  <span>{workshop.venue}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-blue-500" />
                  <span>{workshop.capacity} seats available</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-3">
                {workshop.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                  Register Now
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {workshops.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Workshops Available
          </h3>
          <p className="text-gray-600">
            There are currently no workshops scheduled for {auth.user?.universityName}.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkshopPage;