import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, User, Book, Calendar, CheckCircle, XCircle, Target, Award,Clock,AlignLeft } from 'lucide-react';
import axios from 'axios';
import WorkshopHistory from './WorkshopHistory'
export default function StudentDetail() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [workshopCount,setWorkshopCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const devUrl = 'http://localhost:5000';
  const prodUrl = "https://skillonx-server.onrender.com";
  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await axios.get(
          `${prodUrl}/student/detail/${studentId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        console.log(response.data.data)
        setWorkshopCount(response.data.workshopCount)

        setStudent(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetail();
  }, [studentId]);
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 75) return 'text-teal-500 stroke-teal-500';
    if (score >= 60) return 'text-blue-500 stroke-blue-500';
    return 'text-red-500 stroke-red-500';
  };
  const CircularProgress = ({ percentage, title, date, onSelect }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const radius = 40;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;
    const circleSize = (radius + strokeWidth) * 2;
    const colorClass = getScoreColor(currentPercentage);
  
    useEffect(() => {
      // Start at 0
      setCurrentPercentage(0);
      
      // Delay the animation slightly to allow the component to render
      const timeout = setTimeout(() => {
        // Animate to the final percentage
        const animationDuration = 1500; // 1.5 seconds
        const steps = 60; // 60 frames
        const increment = percentage / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          if (current < percentage) {
            current += increment;
            setCurrentPercentage(Math.min(current, percentage));
          } else {
            clearInterval(interval);
          }
        }, animationDuration / steps);
  
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }, 100);
  
      return () => clearTimeout(timeout);
    }, [percentage]);
  
    return (
      <div 
        className="flex flex-col items-center p-6 bg-gray-700/30 rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50 cursor-pointer"
        onClick={() => onSelect({ title, score: percentage, date })}
      >
        <div className="relative" style={{ width: circleSize, height: circleSize }}>
          <svg className="w-full h-full -rotate-90">
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              className="fill-none stroke-gray-600 transition-all duration-300"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={radius + strokeWidth}
              cy={radius + strokeWidth}
              r={radius}
              className={`fill-none ${colorClass} transition-all duration-100`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${colorClass}`}>
              {Math.round(currentPercentage)}%
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-center text-sm font-medium text-gray-300 max-w-[150px] hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-2 text-xs text-gray-400">{new Date(date).toLocaleDateString()}</p>
      </div>
    );
  };
 
  
  const StatCard = ({ icon: Icon, title, value, colorClass = "text-teal-500" }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-gray-700/50 ${colorClass}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
          <p className={`text-2xl font-bold ${colorClass}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  const AssessmentDetails = ({ assessment, onClose }) => {
    if (!assessment) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 transform animate-scaleIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">{assessment.title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className={`h-6 w-6 ${getScoreColor(assessment.score)}`} />
              <span className="text-lg font-semibold">{assessment.score}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{assessment.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-8 h-8 border-4 border-t-teal-500 border-b-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
        <div className="flex items-center gap-6">
          <div className="bg-gray-700 p-4 rounded-full">
            <User className="h-12 w-12 text-teal-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {student?.studentInfo.firstName} {student?.studentInfo.lastName}
            </h1>
            <p className="text-gray-400">{student?.studentInfo.email}</p>
            <p className="text-gray-400">{student?.studentInfo.universityName}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard 
          icon={Trophy} 
          title="Overall Score" 
          value={`${student?.stats.averageScore}%`}
          colorClass="text-yellow-400"
        />
        <StatCard 
          icon={Target} 
          title="Highest Score" 
          value={`${student?.stats.highestScore}%`}
        />
        <StatCard 
          icon={Award} 
          title="Workshop Registration" 
          value={workshopCount}
        />
        <StatCard 
          icon={Book} 
          title="Assessments" 
          value={student?.stats.totalSubmissions}
        />
      </div>

    {/* Recent Assessments */}
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-teal-500" />
          Recent Assessments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {student?.recentAssessments.map((assessment, index) => (
            <CircularProgress
              key={index}
              percentage={Number((assessment.score.obtainedMarks / assessment.score.totalMarks * 100).toFixed(2))}
              title={assessment.title}
              date={assessment.submittedAt}
              onSelect={setSelectedAssessment}
            />
          ))}
        </div>
      </div>

      {/* Workshops List */}
      <WorkshopHistory workshops={student?.workshops} />

      
      <AssessmentDetails 
        assessment={selectedAssessment} 
        onClose={() => setSelectedAssessment(null)} 
      />
    </div>
  );
}