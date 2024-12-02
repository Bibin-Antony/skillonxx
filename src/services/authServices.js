// src/services/authServices.js
import api from '../api/axios';

export const authService = {
  login: async (credentials) => {
    try {
      // Use different endpoints based on user type
      const endpoint = credentials.userType === 'student' 
        ? '/student/login' 
        : '/university/login';
      
      const response = await api.post(endpoint, {
        email: credentials.email,
        password: credentials.password,
        deviceInfo:credentials.deviceInfo
      });

      return {
        token: response.data.token,
        user: {
          ...response.data.user,
          userType: credentials.userType // Include user type in the response
        }
      };
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const userType = JSON.parse(localStorage.getItem('user'))?.userType;
      const endpoint = userType === 'student' ? '/student/logout' : '/university/logout';
      
      await api.post(endpoint);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Still remove items even if logout request fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  }
};