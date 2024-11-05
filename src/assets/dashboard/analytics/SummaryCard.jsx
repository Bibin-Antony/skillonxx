const SummaryCard = ({ title, value, subtitle, trend, trendDirection }) => {
    return (
      <div className="p-4 rounded-lg bg-gray-50">
        <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${
              trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trendDirection === 'up' ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              {trend}
            </div>
          )}
        </div>
      </div>
    );
  };
  