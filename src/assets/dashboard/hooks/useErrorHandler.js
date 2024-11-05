import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useErrorHandler() {
  const handleError = useCallback((error) => {
    console.error(error);
    
    if (error.response) {
      // Handle API errors
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message);
    } else if (error.request) {
      // Handle network errors
      toast.error('Network error. Please check your connection.');
    } else {
      // Handle other errors
      toast.error('An unexpected error occurred.');
    }
  }, []);

  return { handleError };
}