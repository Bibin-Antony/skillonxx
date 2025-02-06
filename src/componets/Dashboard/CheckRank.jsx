import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Search, ChevronDown, Menu, X, GraduationCap, LayoutDashboard, Book, Calendar, Settings, LogOut, BookOpenCheck, PersonStanding } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import axios from 'axios';

// Card components
const Card = ({ children, className, ...props }) => (
  <div className={`bg-gray-800 rounded-lg shadow-lg border border-gray-700 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`px-6 pb-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-lg font-medium text-gray-100 ${className}`} {...props}>
    {children}
  </h3>
);

const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
    outline: "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-800 hover:text-gray-100",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-2 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const CheckRank = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const uniId = auth.user._id;
  
  const devUrl = 'http://localhost:5000'
  const prodUrl = 'https://skillonx-server.onrender.com'
  // Function to calculate student scores and ranks
  const processStudentData = (studentsData) => {
    return studentsData
      .filter(student => {
        return student.assessmentResults && student.assessmentResults.length > 0;
      })
      .map(student => {
        const workshopAssessments = student.assessmentResults.reduce((acc, result) => {
          const workshopId = result.workshopId;
          if (!acc[workshopId]) {
            acc[workshopId] = [];
          }
          acc[workshopId].push(result);
          return acc;
        }, {});

        const workshopScores = Object.values(workshopAssessments).map(assessments => {
          const workshopTotal = assessments.reduce((sum, result) => {
            return sum + (result.score?.obtainedMarks / result.score?.totalMarks * 100 || 0);
          }, 0);
          return workshopTotal / assessments.length;
        });

        const overallScore = workshopScores.length > 0
          ? (workshopScores.reduce((sum, score) => sum + score, 0) / workshopScores.length).toFixed(2)
          : 0;

        return {
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          score: Number(overallScore),
          assessmentCount: student.assessmentResults?.length || 0,
          workshopCount: Object.keys(workshopAssessments).length
        };
      })
      .sort((a, b) => b.score - a.score);
  };

  // Rest of the component remains the same
  
  useEffect(() => {
    const fetchStudentRankings = async () => {
      const uniId = auth.user._id;
      const token = localStorage.getItem('token');
      
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${prodUrl}/student/rankings/${uniId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const processedData = processStudentData(response.data.data);
        setStudents(processedData);
      } catch (err) {
        setError('Failed to load rankings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentRankings();
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      navigate('/LoginPage');
    } catch (error) {
      logout();
      navigate('/LoginPage');
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (rank) => {
    switch(rank) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 md:flex-row">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 p-4 shadow-sm bg-gray-800 mt-16 md:mt-0 border-r border-gray-700 z-20
      `}>
        <div className="flex items-center gap-2 mb-8">
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          )}
          <div className="bg-teal-500 text-white p-2 rounded">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-gray-100">Dashboard</span>
        </div>

        <nav className="space-y-2">
          <Link to="/university-dashboard" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/university-dashboard/workshops-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Calendar className="h-5 w-5" />
            Workshops
          </Link>
          <Link to="/university-dashboard/assessment-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <BookOpenCheck className="h-5 w-5" />
            Assessment
          </Link>
          <Link to="/university-dashboard/students" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <PersonStanding className="h-5 w-5" />
            Students
          </Link>
          <Link to="/university-dashboard/check-rank" className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded">
            <Trophy className="h-5 w-5" />
            Check Rank
          </Link>
          <Link to="/university-dashboard/profile" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <Button
          className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700 mt-auto absolute bottom-4 left-4"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto hide-scrollbar">
        <header className="bg-gray-800 p-4 shadow-sm border-b border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 text-gray-300 hover:text-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-gray-100">Student Rankings</h1>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="flex flex-col sm:flex-row gap-4 items-center justify-between py-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Top 3 Students */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {filteredStudents.slice(0, 3).map((student, index) => (
              <Card key={student.id} className={`${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-amber-600'}`}>
                <CardContent className="flex items-center gap-4 py-4">
                  {getRankIcon(index)}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100">{student.name}</h3>
                    <p className="text-sm text-gray-400">{student.email}</p>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-teal-400">{student.score}%</span>
                      <span className="text-sm text-gray-400"> average score</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {student.assessmentCount} assessments completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rankings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-400">Student</th>
                      <th className="text-left py-3 px-4 text-gray-400">Email</th>
                      <th className="text-right py-3 px-4 text-gray-400">Score</th>
                      <th className="text-right py-3 px-4 text-gray-400">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-300">#{index + 1}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {index < 3 && getRankIcon(index)}
                            <span className="text-gray-100">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{student.email}</td>
                        <td className="py-3 px-4 text-right text-teal-400">{student.score}%</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-teal-500 h-2 rounded-full"
                                style={{ width: `${student.score}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 min-w-[90px]">
                              {student.assessmentCount} tests
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Scrollbar Style */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default CheckRank;