import React, { useState } from 'react';
import { Filter, X, Check, Calendar, Clock } from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';

const AdvancedFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'all',
    type: [],
    status: [],
    difficulty: []
  });

  const filterOptions = {
    dateRange: [
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'all', label: 'All Time' }
    ],
    type: [
      { value: 'course', label: 'Courses' },
      { value: 'workshop', label: 'Workshops' },
      { value: 'assessment', label: 'Assessments' },
      { value: 'project', label: 'Projects' }
    ],
    status: [
      { value: 'ongoing', label: 'Ongoing' },
      { value: 'completed', label: 'Completed' },
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'overdue', label: 'Overdue' }
    ],
    difficulty: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  };

  const handleFilterChange = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: Array.isArray(prev[category])
        ? prev[category].includes(value)
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value]
        : value
    }));
  };

  const getActiveFilterCount = () => {
    return Object.entries(activeFilters).reduce((count, [key, value]) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return count + (value !== 'all' ? 1 : 0);
    }, 0);
  };

  const clearFilters = () => {
    setActiveFilters({
      dateRange: 'all',
      type: [],
      status: [],
      difficulty: []
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
      >
        <Filter className="w-4 h-4" />
        <span className="font-medium text-gray-700">Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Date Range */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Date Range</h4>
            <div className="space-y-2">
              {filterOptions.dateRange.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="dateRange"
                    checked={activeFilters.dateRange === option.value}
                    onChange={() => handleFilterChange('dateRange', option.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Type</h4>
            <div className="space-y-2">
              {filterOptions.type.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.type.includes(option.value)}
                    onChange={() => handleFilterChange('type', option.value)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.status.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('status', option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    activeFilters.status.includes(option.value)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filters */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h4>
            <div className="flex space-x-2">
              {filterOptions.difficulty.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('difficulty', option.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                    activeFilters.difficulty.includes(option.value)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-700 font-medium"
            >
              Clear all
            </button>
            <button
              onClick={() => {
                // Apply filters
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;