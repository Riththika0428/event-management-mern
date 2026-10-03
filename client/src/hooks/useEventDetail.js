import { useState, useEffect } from 'react';
import { eventService } from '../services/api';

export const useEventDetail = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await eventService.getEventById(eventId);
        setEvent(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { event, loading, error };
};