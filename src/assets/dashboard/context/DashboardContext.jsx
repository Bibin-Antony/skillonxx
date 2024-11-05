import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Define DashboardContext
const DashboardContext = createContext();

// Mock data definition
const mockData = {
    studentInfo: {
        name: "John Doe",
        profileImage: "path/to/image.jpg",
        university: "Example University",
        enrollmentId: "123456",
        completedCourses: 5,
        ongoingCourses: 2,
        certifications: 1,
        nextInterview: "2024-11-30",
        skillScore: 75,
        ranking: 12,
        totalStudents: 100,
    },
    activities: [],
    events: [],
    learningPaths: [],
    skills: {
        items: [
            { name: "JavaScript", progress: 80 },
            { name: "React", progress: 60 },
        ]
    }
};

// Action types
const DASHBOARD_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    LOAD_MOCK_DATA: 'LOAD_MOCK_DATA',
    UPDATE_SKILL_PROGRESS: 'UPDATE_SKILL_PROGRESS'
};

// Initial state
const initialState = {
    isLoading: false,
    error: null,
    dataLoaded: false,
    studentInfo: {
        name: "",
        profileImage: "",
        university: "",
        enrollmentId: "",
        completedCourses: 0,
        ongoingCourses: 0,
        certifications: 0,
        nextInterview: null,
        skillScore: 0,
        ranking: 0,
        totalStudents: 0
    },
    activities: [],
    events: [],
    learningPaths: [],
    skills: {
        items: []
    }
};

// Reducer function
function dashboardReducer(state, action) {
    switch (action.type) {
        case DASHBOARD_ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case DASHBOARD_ACTIONS.SET_ERROR:
            return { ...state, error: action.payload };
        case DASHBOARD_ACTIONS.LOAD_MOCK_DATA:
            return { 
                ...state, 
                ...mockData, // Make sure mockData is defined
                dataLoaded: true
            };
        case DASHBOARD_ACTIONS.UPDATE_SKILL_PROGRESS:
            return {
                ...state,
                skills: {
                    ...state.skills,
                    items: state.skills.items.map(skill =>
                        skill.name === action.payload.skillName
                            ? { ...skill, progress: action.payload.progress }
                            : skill
                    )
                }
            };
        default:
            return state;
    }
}

// DashboardProvider component
export function DashboardProvider({ children }) {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);

    const actions = {
        loadDashboardData: useCallback(() => {
            if (state.dataLoaded) return; 
            dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: true });
            
            setTimeout(() => {
                dispatch({ type: DASHBOARD_ACTIONS.LOAD_MOCK_DATA });
                dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: false });
            }, 1000);
        }, [state.dataLoaded]), 

        updateSkillProgress: useCallback((skillName, progress) => {
            dispatch({
                type: DASHBOARD_ACTIONS.UPDATE_SKILL_PROGRESS,
                payload: { skillName, progress }
            });
        }, [])
    };

    return (
        <DashboardContext.Provider value={{ state, actions }}>
            {children}
        </DashboardContext.Provider>
    );
}

// Custom hook to access the DashboardContext
export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
