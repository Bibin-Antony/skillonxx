import { AlignLeft, UserCheck } from 'lucide-react';

const WorkshopHistory = ({ workshops }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlignLeft className="h-6 w-6 text-teal-500" />
        Workshop History
      </h2>
      <div className="space-y-4">
        {workshops?.map(workshop => (
          <div 
            key={workshop.id} 
            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg transform transition-all duration-300 hover:bg-gray-700/50 hover:scale-[1.01]"
          >
            <div className="flex-grow">
              <h3 className="font-medium">{workshop.title}</h3>
              <p className="text-sm text-gray-400">{new Date(workshop.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-400">Duration: {workshop.duration}</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-lg">
              <UserCheck className="h-5 w-5 text-teal-500" />
              <span className="text-sm font-medium">
                Attendance: {workshop.attendanceCount || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopHistory;