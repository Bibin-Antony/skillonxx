import React, { useState, useEffect } from "react";
import {
  School,
  Search,
  Plus,
  Eye,
  Edit,
  Trash,
  ArrowLeft,
  Loader,
  Users,
  Calendar,
  Mail,
  MapPin,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
const DeleteModal = ({ isOpen, onClose, onConfirm, universityName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-800 rounded-lg w-full max-w-md m-4 p-6 shadow-xl transform transition-all animate-modalIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Delete University
          </h3>
          <p className="text-gray-400">
            Are you sure you want to delete{" "}
            <span className="text-white">{universityName}</span>? This action
            cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
const AdminUniversities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null);
  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const token = localStorage.getItem('token')
      setLoading(true);
      const response = await axios.get(
        "https://skillonx-server.onrender.com/admin/universities", {

        headers: {
          Authorization: `Bearer ${token}`
        }

      }
      );
      console.log(response.data.universities);
      setUniversities(response.data.universities);
      setError(null);
    } catch (err) {
      setError("Failed to fetch universities. Please try again later.");
      console.error("Error fetching universities:", err);
    } finally {
      setLoading(false);
    }
  };
  const openDeleteModal = (university) => {
    // Just store the ID now since that's all we need
    // console.log(university._id)
    setUniversityToDelete(university._id);
    setDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      if (!universityToDelete) return;
      const token = localStorage.getItem('token')
      // Now universityToDelete is the ID directly, so use it without ._id
      //https://skillonx-server.onrender.com/admin/universities/672d7346d4a09c8b46fdd1ca
      await axios.delete(
        `https://skillonx-server.onrender.com/admin/universities/${universityToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDeleteModalOpen(false);
      setUniversityToDelete(null);
      fetchUniversities();
    } catch (err) {
      console.error("Error deleting university:", err);
      alert("Failed to delete university. Please try again.");
    }
  };

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.universityAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading State Component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader className="w-8 h-8 text-teal-500 animate-spin mb-4" />
      <p className="text-gray-400">Loading universities...</p>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button
          onClick={fetchUniversities}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-900 p-6">
      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUniversityToDelete(null);
        }}
        onConfirm={handleDelete}
        universityName={universities.find(u => u._id === universityToDelete)?.universityName}
      />
      <Link
        to="/admin"
        className="mb-6 pl-24 inline-flex items-center text-cyan-600 hover:text-cyan-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header with Search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white">Universities</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <Link
              to="/admin/universities/new"
              className="flex items-center gap-2 bg-teal-500 px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-white"
            >
              <Plus className="w-4 h-4" />
              Add University
            </Link>
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No universities found</p>
              </div>
            ) : (
              filteredUniversities.map((university, index) => (
                <div
                  key={university._id}
                  className="bg-gray-800 rounded-lg p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideIn 0.5s ease-out forwards",
                  }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors duration-300">
                        <School className="w-6 h-6 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                          {university.universityName}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          {university.universityAddress}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-16 md:ml-0">
                      <Link
                        to={`/admin/universities/${university._id}`}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/admin/universities/${university._id}/edit`}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(university)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-red-400"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pl-16">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-teal-500" />
                        <p className="text-gray-400">Workshops</p>
                      </div>
                      <p className="text-2xl font-semibold text-white">
                        {university.workshops.length}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-teal-500" />
                        <p className="text-gray-400">Students</p>
                      </div>
                      <p className="text-2xl font-semibold text-white">
                        {university.students.length}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-teal-500" />
                        <p className="text-gray-400">Registrations</p>
                      </div>
                      <p className="text-2xl font-semibold text-white">
                        {university.workshopRegistrations.length}
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-teal-500" />
                        <p className="text-gray-400">Contact</p>
                      </div>
                      <p className="text-sm text-white truncate">
                        {university.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminUniversities;
