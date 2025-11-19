import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch weather data for a specific city
 * @param {string} city - Name of the city
 * @returns {Promise} Weather data
 */
export const getWeather = async (city) => {
  try {
    const response = await api.get('/api/weather', {
      params: { city },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Failed to fetch weather data');
    } else if (error.request) {
      // No response received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Request setup error
      throw new Error('Failed to make request');
    }
  }
};

/**
 * Fetch search history
 * @param {number} limit - Maximum number of records to fetch
 * @returns {Promise} Search history data
 */
export const getHistory = async (limit = 10) => {
  try {
    const response = await api.get('/api/history', {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch history');
  }
};

/**
 * Clear search history
 * @returns {Promise} Success message
 */
export const clearHistory = async () => {
  try {
    const response = await api.delete('/api/history');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to clear history');
  }
};

export default api;

