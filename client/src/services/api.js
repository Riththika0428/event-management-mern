import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Please log in');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Server error - Please try again later');
    }
    return Promise.reject(error);
  }
);

// Event endpoints
export const eventService = {
  getAllEvents: (search = '', category = '') => {
    let url = '/events';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    if (params.toString()) url += `?${params.toString()}`;
    return api.get(url);
  },
  getEventById: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`)
};

// Registration endpoints
export const registrationService = {
  registerForEvent: (eventId, data) => api.post(`/events/${eventId}/register`, data),
  getEventRegistrations: (eventId) => api.get(`/events/${eventId}/registrations`)
};

export default api;