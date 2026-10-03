import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col hover:scale-105 transform transition-transform">
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
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
              <span>{event.organizer}</span>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
}