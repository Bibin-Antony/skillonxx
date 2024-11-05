import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  const ProgressAnalytics = ({ data }) => {
    const [timeRange, setTimeRange] = useState('week');
    const [metric, setMetric] = useState('progress');
  
    const timeRanges = [
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'quarter', label: 'This Quarter' },
      { value: 'year', label: 'This Year' }
    ];
  
    const metrics = [
      { value: 'progress', label: 'Learning Progress' },
      { value: 'time', label: 'Study Time' },
      { value: 'achievements', label: 'Achievements' },
      { value: 'assessments', label: 'Assessment Scores' }
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Progress Analytics</h2>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {metrics.map(m => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
  
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <SummaryCard
            title="Average Progress"
            value={`${data.reduce((acc, cur) => acc + cur[metric], 0) / data.length}%`}
            trend="+5.2%"
            trendDirection="up"
          />
          <SummaryCard
            title="Best Day"
            value={Math.max(...data.map(d => d[metric]))}
            subtitle={data.find(d => d[metric] === Math.max(...data.map(d => d[metric]))).date}
            trend="New record!"
            trendDirection="up"
          />
          <SummaryCard
            title="Consistency"
            value="92%"
            subtitle="Study streak: 7 days"
            trend="+3%"
            trendDirection="up"
          />
        </div>
      </div>
    );
  };