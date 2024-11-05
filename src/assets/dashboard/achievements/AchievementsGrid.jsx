import React, { useState } from 'react';
import { Trophy, Medal, Star, Target, Award } from 'lucide-react';

const AchievementsGrid = ({ achievements }) => {
  const [filter, setFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'courses', label: 'Courses' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'community', label: 'Community' }
  ];
  
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    return achievement.category === filter;
  });
  
  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }) => {
  const getIcon = () => {
    const iconProps = {
      className: `w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`
    };
    
    switch (achievement.icon) {
      case 'trophy':
        return <Trophy {...iconProps} />;
      case 'medal':
        return <Medal {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'target':
        return <Target {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };
  
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        achievement.unlocked
          ? 'border-blue-200 bg-white hover:shadow-md'
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
    >
      <div className="text-center">
        <div 
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 transition-colors ${
            achievement.unlocked 
              ? achievement.bgColor || 'bg-blue-500'
              : 'bg-gray-200'
          }`}
        >
          {getIcon()}
        </div>
        
        <h3 className="font-medium text-gray-900 mb-1">{achievement.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
        
        {achievement.progress && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>{achievement.progress.current}</span>
              <span>{achievement.progress.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 rounded-full h-1.5 transition-all"
                style={{
                  width: `${(achievement.progress.current / achievement.progress.target) * 100}%`
                }}
              />
            </div>
          </div>
        )}
        
        {achievement.unlockDate && (
          <p className="text-xs text-gray-500 mt-2">
            Unlocked on {new Date(achievement.unlockDate).toLocaleDateString()}
          </p>
        )}
        
        {!achievement.unlocked && achievement.requirement && (
          <p className="text-xs text-gray-500 mt-2">
            Requirement: {achievement.requirement}
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementsGrid;