import { useState, useEffect } from 'react';
import { eventService } from '../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchEvents = async (searchTerm = '', selectedCategory = 'All') => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventService.getAllEvents(searchTerm, selectedCategory);
      setEvents(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(search, category);
  }, [search, category]);

  return {
    events,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    fetchEvents
  };
};