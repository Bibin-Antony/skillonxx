// src/config/api.js
import axios from 'axios';

const BASE_URL = "http://localhost:5000";
const PROD_URL = "https://skillonx-server.onrender.com";

// Use this to easily switch between development and production
export const apiBaseUrl = BASE_URL;

// Create axios instance
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
export const api = {
  get: (endpoint, config = {}) => apiClient.get(endpoint, config),
  post: (endpoint, data, config = {}) => apiClient.post(endpoint, data, config),
  put: (endpoint, data, config = {}) => apiClient.put(endpoint, data, config),
  delete: (endpoint, config = {}) => apiClient.delete(endpoint, config)
};