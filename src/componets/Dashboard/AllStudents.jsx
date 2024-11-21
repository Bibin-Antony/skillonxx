import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, UserCircle, X,Search, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios';

const AllStudents = () => {
    const { auth } = useAuth();
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('firstName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterGender, setFilterGender] = useState('all');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const studentsPerPage = 9;
    const uniId = auth.user._id;

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`https://skillonx-server.onrender.com/university/get-students/${uniId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            const formattedStudents = response.data.data.map(student => ({
                ...student,
                fullName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A'
            }));
            setStudents(formattedStudents || []);
            setIsLoading(false);
        } catch (err) {
            console.log(err, "there is error");
            setIsLoading(false);
            setStudents([]);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [uniId]);

    // Safe string check function
    const safeIncludes = (text, searchTerm) => {
        return (text || '').toString().toLowerCase().includes(searchTerm.toLowerCase());
    };

    // Filter students
    const filteredStudents = students.filter(student => {
        if (!student) return false;

        const matchesSearch = searchTerm === '' ||
            safeIncludes(student.fullName, searchTerm) ||
            safeIncludes(student.email, searchTerm) ||
            safeIncludes(student.universityName, searchTerm);

        const matchesGender = filterGender === 'all' ||
            (student.gender && student.gender.toLowerCase() === filterGender.toLowerCase());

        return matchesSearch && matchesGender;
    });

    // Sort students
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        if (!a || !b) return 0;

        const getCompareValue = (student) => {
            if (sortBy === 'name') return student.fullName;
            return student[sortBy] || '';
        };

        return getCompareValue(a).localeCompare(getCompareValue(b)) * order;
    });

    // Pagination logic
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    const MobileFilters = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
                isMobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileFiltersOpen(false)}
        >
            <div
                className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-gray-800 p-4 border-l border-gray-700"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Filters</h3>
                    <button
                        onClick={() => setIsMobileFiltersOpen(false)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-gray-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                        <select
                            className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100"
                            value={filterGender}
                            onChange={(e) => setFilterGender(e.target.value)}
                        >
                            <option value="all">All Genders</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-900 pt-16 px-2 sm:px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="inline-block p-2 bg-gray-800 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-teal-500" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">Students Directory</h1>
                    <p className="text-gray-400">Managing {students.length} students</p>
                </div>

                {/* Controls Section */}
                <div className="mb-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                    <div className="p-4 md:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-gray-100 placeholder-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <select
                                    className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-gray-100"
                                    value={filterGender}
                                    onChange={(e) => setFilterGender(e.target.value)}
                                >
                                    <option value="all">All Genders</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <select
                                    className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-gray-100"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="name">Sort by Name</option>
                                    <option value="email">Sort by Email</option>
                                    <option value="universityName">Sort by University</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors text-gray-100"
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students Grid */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {currentStudents.map((student) => (
                        <div
                            key={student._id}
                            className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-700 hover:border-gray-600"
                        >
                            <div className="p-5 md:p-6">
                                {/* Student Header */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-teal-500/10 p-3 rounded-lg">
                                        <UserCircle className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-100 mb-1">{student.fullName}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900/50 text-teal-400">
                                            {student.gender || 'Not Specified'}
                                        </span>
                                    </div>
                                </div>

                                {/* Student Details */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center p-2 rounded-lg bg-gray-900 group hover:bg-gray-700 transition-colors">
                                        <Mail className="w-4 h-4 text-teal-500 mr-3" />
                                        <span className="text-gray-300 break-all">{student.email || 'No email'}</span>
                                    </div>

                                    <div className="flex items-center p-2 rounded-lg bg-gray-900 group hover:bg-gray-700 transition-colors">
                                        <Phone className="w-4 h-4 text-teal-500 mr-3" />
                                        <span className="text-gray-300">{student.phone || 'Not provided'}</span>
                                    </div>

                                    <div className="flex items-center p-2 rounded-lg bg-gray-900 group hover:bg-gray-700 transition-colors">
                                        <Building className="w-4 h-4 text-teal-500 mr-3" />
                                        <span className="text-gray-300">{student.universityName || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center flex-wrap gap-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 bg-gray-800 rounded-lg border border-gray-700 disabled:opacity-50 hover:bg-gray-700 transition-colors text-gray-300"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                        currentPage === number
                                            ? 'bg-teal-500 text-white shadow-lg'
                                            : 'bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300'
                                    }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-gray-800 rounded-lg border border-gray-700 disabled:opacity-50 hover:bg-gray-700 transition-colors text-gray-300"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {sortedStudents.length === 0 && (
                    <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                        <div className="bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-teal-500" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-100 mb-1">No Students Found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Mobile Filters */}
            <MobileFilters />
        </div>
    );
};

export default AllStudents;