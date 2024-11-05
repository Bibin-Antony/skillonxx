// types.js
export const DASHBOARD_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
    SET_SEARCH_ERROR: 'SET_SEARCH_ERROR',
    CLEAR_SEARCH: 'CLEAR_SEARCH'
  };
  
  // DashboardContext.jsx
  import React, { createContext, useContext, useReducer, useCallback } from 'react';
  import { dashboardService } from '../services/dashboard.service';
  
  const initialState = {
    isLoading: false,
    searchResults: [],
    searchError: null,
    searchQuery: '',
    searchFilters: {}
  };
  
  const DashboardContext = createContext(initialState);
  
  function dashboardReducer(state, action) {
    switch (action.type) {
      case DASHBOARD_ACTIONS.SET_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      case DASHBOARD_ACTIONS.SET_SEARCH_RESULTS:
        return {
          ...state,
          searchResults: action.payload,
          searchError: null
        };
      case DASHBOARD_ACTIONS.SET_SEARCH_ERROR:
        return {
          ...state,
          searchError: action.payload,
          searchResults: []
        };
      case DASHBOARD_ACTIONS.CLEAR_SEARCH:
        return {
          ...state,
          searchResults: [],
          searchError: null,
          searchQuery: '',
          searchFilters: {}
        };
      default:
        return state;
    }
  }
  
  export function DashboardProvider({ children }) {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
  
    const handleError = useCallback((error) => {
      console.error('Dashboard Error:', error);
      dispatch({ 
        type: DASHBOARD_ACTIONS.SET_SEARCH_ERROR, 
        payload: error.message || 'An error occurred while searching'
      });
    }, []);
  
    const searchContent = useCallback(async (query, filters = {}) => {
      try {
        dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: true });
        const results = await dashboardService.search(query, filters);
        dispatch({ type: DASHBOARD_ACTIONS.SET_SEARCH_RESULTS, payload: results });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: false });
      }
    }, [handleError]);
  
    const clearSearch = useCallback(() => {
      dispatch({ type: DASHBOARD_ACTIONS.CLEAR_SEARCH });
    }, []);
  
    const value = {
      ...state,
      searchContent,
      clearSearch
    };
  
    return (
      <DashboardContext.Provider value={value}>
        {children}
      </DashboardContext.Provider>
    );
  }
  
  // Custom hook for using the dashboard context
  export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
      throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
  }
  
  // hooks/useSearch.js
  export function useSearch() {
    const {
      isLoading: isSearching,
      searchResults,
      searchError,
      searchContent: search,
      clearSearch
    } = useDashboard();
  
    return {
      isSearching,
      searchResults,
      searchError,
      search,
      clearSearch
    };
  }
  
  // Example usage in a component:
  function SearchComponent() {
    const { 
      isSearching, 
      searchResults, 
      searchError, 
      search, 
      clearSearch 
    } = useSearch();
  
    const handleSearch = async (query, filters) => {
      await search(query, filters);
    };
  
    return (
      <div>
        {/* Search UI implementation */}
      </div>
    );
  }