import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const TimelineComponent = ({ data }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
      
      <div className="space-y-8">
        {data.map((event, index) => (
          <div key={index} className="relative flex items-start gap-6">
            {/* Timeline dot */}
            <div className={`absolute left-8 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 
              ${event.status === 'completed' ? 'bg-green-500 border-green-600' :
                event.status === 'active' ? 'bg-blue-500 border-blue-600' :
                'bg-gray-200 border-gray-300'}`}>
            </div>
            
            {/* Date column */}
            <div className="w-32 pt-1 flex flex-col">
              <span className="text-sm font-semibold text-gray-700">{event.date}</span>
              <span className="text-xs text-gray-500">{event.time}</span>
            </div>
            
            {/* Content */}
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TimelineComponent;