import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const StatsCard = ({ icon, label, value, trend, trendDirection }) => {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="p-3 bg-white/10 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <div className="flex items-center space-x-2">
          <p className="text-xl font-semibold">{value}</p>
          {trend && (
            <div className="flex items-center text-sm">
              {getTrendIcon()}
              <span className="ml-1">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;