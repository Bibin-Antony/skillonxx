import React from 'react';
import StatsCard from './StatsCard';
import { Trophy, Target, GraduationCap, BookOpen } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
const TopStatsBar = () => {
  const { state: { studentInfo } } = useDashboard();

  const stats = [
    {
      icon: <Trophy className="w-6 h-6" />,
      label: "Skill Score",
      value: studentInfo.skillScore,
      trend: "+5%",
      trendDirection: "up"
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Ranking",
      value: `#${studentInfo.ranking} of ${studentInfo.totalStudents}`,
      trend: "Top 10%",
      trendDirection: "up"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      label: "Certifications",
      value: studentInfo.certifications,
      trend: "+1 this month",
      trendDirection: "up"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Active Courses",
      value: studentInfo.ongoingCourses,
      trend: "2 due soon",
      trendDirection: "neutral"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStatsBar;