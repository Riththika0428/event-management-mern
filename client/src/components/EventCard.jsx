import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/events/${event._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {!imageError ? (
            <img
              src={event.image}
              alt={event.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-4xl text-white">🎯</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

          {/* Event Details */}
          <div className="space-y-2 text-sm text-gray-700 mb-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="line-clamp-1">{event.organizer}</span>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition active:scale-95">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
}