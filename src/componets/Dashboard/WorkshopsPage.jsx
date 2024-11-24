import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Calendar, MapPin, Clock, Users, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationPassword from './RegistrationPassword';


const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const { auth } = useAuth();
  const stuId = auth.user._id;

  useEffect(() => {
    const fetchWorkshops = async () => {
      const devUrl = 'https://skillonx-server.onrender.com'
      try {
        const response = await fetch(`https://skillonx-server.onrender.com/workshops/get-workshops/${stuId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }

        const data = await response.json();
        setWorkshops(data.workshops);
        setLoading(false);
      } catch (err) {
        // console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (auth.user) {
      fetchWorkshops();
    }
  }, [auth.user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-10">
      <Link
        to="/student-dashboard"
        className="mb-6 inline-flex pt-8 pl-36 items-center text-teal-500 hover:text-gray-300"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-100">Available Workshops</h1>
          <p className="mt-2 text-gray-400">
            Explore workshops offered by {auth.user?.universityName}
          </p>
        </motion.div>

        <AnimatePresence>
          {workshops.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-100">No Workshops Available</h3>
              <p className="mt-1 text-gray-400">There are currently no workshops scheduled for {auth.user?.universityName}.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-r from-teal-600 to-gray-800 relative">
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-gray-900 rounded-full text-sm font-medium text-teal-500">
                        {workshop.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">{workshop.title}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5 mr-3 text-teal-500" />
                        <span>{new Date(workshop.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="h-5 w-5 mr-3 text-teal-500" />
                        <span>{workshop.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-5 w-5 mr-3 text-teal-500" />
                        <span>{workshop.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5 mr-3 text-teal-500" />
                        <span>{workshop.capacity} seats available</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {workshop.description}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedWorkshop(workshop)}
                        className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center"
                      >
                        Register Now
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </button>
                      <button className="flex-1 border border-gray-600 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {selectedWorkshop && (
          <RegistrationPassword
            workshop={selectedWorkshop}
            onClose={() => setSelectedWorkshop(null)}
            stuId={stuId}
          />
        )}
      </div>
    </div>
  );
};

export default WorkshopPage;