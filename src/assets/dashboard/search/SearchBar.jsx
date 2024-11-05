import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useDashboard } from '../context/DashboardContext';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);
  const { state, actions } = useDashboard();

  const [filters, setFilters] = useState({
    type: [],
    difficulty: [],
    duration: [],
    status: []
  });

  useEffect(() => {
    if (debouncedQuery) {
      actions.searchContent(debouncedQuery, filters);
    }
  }, [debouncedQuery, filters, actions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    actions.searchContent(query, filters);
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search courses, workshops, etc..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        
        {/* Filter Button */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="ml-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border p-4 z-10">
          <div className="grid grid-cols-2 gap-4">
            {/* Type Filter */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Type</h3>
              <div className="space-y-2">
                {['Courses', 'Workshops', 'Assessments'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleFilter('type', type)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Difficulty</h3>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(level)}
                      onChange={() => toggleFilter('difficulty', level)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setFilters({
                type: [],
                difficulty: [],
                duration: [],
                status: []
              })}
               className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 font-medium"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => {
                actions.searchContent(query, filters);
                setShowFilters(false);
              }}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border max-h-[400px] overflow-y-auto z-20">
          <SearchResults query={query} filters={filters} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

// Search Results Component
const SearchResults = ({ query, filters, onClose }) => {
  const { state: { searchResults, isSearching } } = useDashboard();
  
  if (isSearching) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-600 mt-2">Searching...</p>
      </div>
    );
  }

  if (!searchResults?.length) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <div>
      {/* Group results by category */}
      {Object.entries(groupResultsByCategory(searchResults)).map(([category, items]) => (
        <div key={category}>
          <div className="px-4 py-2 bg-gray-50 border-b">
            <h3 className="text-sm font-medium text-gray-700">{category}</h3>
          </div>
          {items.map((result) => (
            <SearchResultItem key={result.id} result={result} onClose={onClose} />
          ))}
        </div>
      ))}
    </div>
  );
};

// Search Result Item Component
const SearchResultItem = ({ result, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClose();
    navigate(getResultLink(result));
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-3 hover:bg-gray-50 flex items-start space-x-3 text-left"
    >
      <div className={`p-2 rounded-lg flex-shrink-0 ${getResultIconBg(result.type)}`}>
        {getResultIcon(result.type)}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{result.description}</p>
        {result.meta && (
          <div className="flex items-center space-x-2 mt-1">
            {result.meta.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

// Helper functions
const groupResultsByCategory = (results) => {
  return results.reduce((acc, result) => {
    const category = result.type.charAt(0).toUpperCase() + result.type.slice(1);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {});
};

const getResultIcon = (type) => {
  switch (type) {
    case 'course':
      return <BookOpen className="w-5 h-5" />;
    case 'workshop':
      return <Users className="w-5 h-5" />;
    case 'assessment':
      return <ClipboardCheck className="w-5 h-5" />;
    default:
      return <File className="w-5 h-5" />;
  }
};

const getResultIconBg = (type) => {
  switch (type) {
    case 'course':
      return 'bg-blue-100 text-blue-600';
    case 'workshop':
      return 'bg-purple-100 text-purple-600';
    case 'assessment':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getResultLink = (result) => {
  switch (result.type) {
    case 'course':
      return `/courses/${result.id}`;
    case 'workshop':
      return `/workshops/${result.id}`;
    case 'assessment':
      return `/assessments/${result.id}`;
    default:
      return '/';
  }
};

export default SearchBar;