const ActivityHeatMap = ({ activities }) => {
    // Group activities by date
    const groupedActivities = activities.reduce((acc, activity) => {
      const date = new Date(activity.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {});
  
    // Generate calendar data for the last 12 months
    const generateCalendarData = () => {
      const data = [];
      const end = new Date();
      const start = new Date(end.getFullYear() - 1, end.getMonth(), end.getDate());
  
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        data.push({
          date,
          count: groupedActivities[date]?.length || 0
        });
      }
  
      return data;
    };
  
    const calendarData = generateCalendarData();
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity History</h2>
        <div className="grid grid-cols-53 gap-1">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${
                day.count === 0 
                  ? 'bg-gray-100' 
                  : day.count < 3
                  ? 'bg-blue-200'
                  : day.count < 5
                  ? 'bg-blue-400'
                  : 'bg-blue-600'
              }`}
              title={`${day.date}: ${day.count} activities`}
            />
          ))}
        </div>
        <div className="flex items-center justify-end mt-4 space-x-2 text-sm text-gray-600">
          <span>Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm" />
          <div className="w-3 h-3 bg-blue-200 rounded-sm" />
          <div className="w-3 h-3 bg-blue-400 rounded-sm" />
          <div className="w-3 h-3 bg-blue-600 rounded-sm" />
          <span>More</span>
        </div>
      </div>
    );
  };
  
  export {
    AchievementsGrid,
    AchievementStats,
    ProgressAnalytics,
    SkillRadarChart,
    ActivityHeatMap
  };