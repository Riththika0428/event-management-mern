import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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